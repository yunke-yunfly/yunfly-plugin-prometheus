
import type { Config, AnyOptionConfig } from '@yunflyjs/yunfly';
import { aggregatorRegistry } from './sdk';

// require
const cluster = require('cluster');
const sendmessage = require('sendmessage');

/**
 * yunfly prometheus plugin
 *
 * @export
 * @param {*} { config }
 */
export default function YunflyPrometheusPlugin({ config }: any): void {
  getClusterMetrics(config);
}

/**
 * forward prometheus messages
 *
 * @param {Config} config
 * @return {*}  {void}
 */
export const getClusterMetrics = (config: Config = {}): void => {
  if (!config.cluster?.enable && !config.prometheus?.enable) {
    return;
  }
  for (const id in cluster.workers) {
    const worker = cluster.workers[id];
    worker.on('message', async (msg: AnyOptionConfig) => {
      if (msg.from === 'worker' && msg.to === 'app' && msg.type === 'get-prometheus-cluster-metrics') {
        let res = await aggregatorRegistry.clusterMetrics();
        sendmessage(worker, { type: 'response-prometheus-cluster-metrics', from: 'app', to: 'worker', data: res ? res : null });
        res = null;
      }
    });
  }
};

