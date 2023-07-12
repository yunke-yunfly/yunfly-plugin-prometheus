// prometheus
import client, { ClientRequestTotalCounter, ResTracingHTotalHistogram, ProcessExitTotal } from '../sdk';
import type * as Koa from 'koa';
import type { KoaApp } from '@yunflyjs/yunfly';
import logger from '@yunflyjs/loggers';
import type { AnyOptionConfig, PrometheusConfig } from '../types';
import { getPath } from './utils';

const cluster = require('cluster');
const EventEmitter = require('events');
const sendmessage = require('sendmessage');

/**
 * prometheus plugin
 *
 * @export
 * @param {KoaApp} app
 * @param {PrometheusConfig} pluginConfig
 * @returns
 */
export default function Prometheus(app: KoaApp, pluginConfig: PrometheusConfig) {
  const myEmitter = new EventEmitter();
  myEmitter?.setMaxListeners(15);
  const action = 'get-prometheus-cluster-metrics';
  const resaction = 'response-prometheus-cluster-metrics';
  const emitAction = 'get-prometheus-cluster-data';

  // 中间件
  app.use(async (ctx: Koa.Context, next: any) => {
    if (ctx.req.url === '/metrics') {
      if (pluginConfig.log) {
        logger.info({ msg: '### Request metrics ###', url: '/metrics', method: 'GET' });
      }
      ctx.set('Content-Type', client.register.contentType);
      ctx.status = 200;

      if (cluster.isWorker) {
        sendmessage(process, { from: 'worker', to: 'app', type: action });
        const getClusterMetrics = async () => new Promise((resolve) => {
          const emmiterFn = (data: string = '') => {
            clearTimeout(timer); resolve(data);
            try { myEmitter.removeListener(emitAction, emmiterFn); } catch (e: any) {
              // do nothing
            }
          };
          const timer = setTimeout(() => {
            resolve('');
            try { myEmitter.removeListener(emitAction, emmiterFn); } catch (err: any) {
              // do nothing
            }
          }, 5000);
          myEmitter.once(emitAction, emmiterFn);
        });

        const res = await getClusterMetrics();
        try { myEmitter.removeAllListeners(); } catch (err: any) {
          // do nothing
        }
        if (res) {
          // eslint-disable-next-line require-atomic-updates
          ctx.body = res;
          return;
        }
      }

      // eslint-disable-next-line require-atomic-updates
      ctx.body = await client.register.metrics();
      return;
    }

    const url = ctx.path || ctx.request.url;
    const path = getPath(url);
    const start = process.hrtime();

    try {
      await next();
    } finally {
      const response: any = ctx.body || {};
      const keyName = pluginConfig.resCodeKeyName || 'code';
      const code = typeof (response) === 'object' ? (response[keyName] || '') : 0;
      const method = ctx.method.toUpperCase();

      // 统计客户端请求记录
      try {
        ClientRequestTotalCounter.inc({ path, method, status: ctx.status, code }, 1);
      } catch (err) {
        logger.error({
          msg: 'ClientRequestTotalCounter: prometheus sdk error',
          error: err,
        });
      }

      // 统计客户端请求性能数据
      try {
        const hrtime2ms = (hrtime: any) => (hrtime[0] * 1e9 + hrtime[1]) / 1e6;
        const dur = hrtime2ms(process.hrtime(start));
        ResTracingHTotalHistogram.observe({ path, method, status: ctx.status, code }, dur);
      } catch (err) {
        logger.error({
          msg: 'ResTracingHTotalHistogram: prometheus sdk error',
          error: err,
        });
      }
    }
  });

  process.on('exit', () => {
    myEmitter.removeAllListeners();
  });

  // watch worker process or alone process exit event.
  if (cluster.isWorker) {
    process.on('message', (msg: AnyOptionConfig = {}) => {
      const { action, from, to, type } = msg || {};
      if (from === 'app' && to === 'worker' && type === resaction) {
        // 转发prometheus数据
        myEmitter.emit(emitAction, msg.data);
      }
      else if (action === 'worker-process-exit-counter' && from === 'app' && to === 'worker') {
        try { ProcessExitTotal.inc({ type: 'worker' }, 1); } catch (error) {
          logger.error({
            msg: 'ProcessExitTotal: prometheus sdk error',
            error: error,
          });
        }
      }
      else if (action === 'alone-process-exit-counter' && from === 'app' && to === 'worker') {
        try { ProcessExitTotal.inc({ type: 'alone' }, 1); } catch (error) {
          logger.error({
            msg: 'ProcessExitTotal: prometheus sdk error',
            error: error,
          });
        }
      }
    });
  }
}



