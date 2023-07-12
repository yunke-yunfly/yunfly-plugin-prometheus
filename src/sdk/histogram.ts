const client = require('prom-client');

/*
* 客户端请求api耗时
*/
export const ResTracingHTotalHistogram = new client.Histogram({
  name: `yunfly_res_tracing_h_total`,
  help: 'Duration of HTTP requests in ms',
  labelNames: ['path', 'method', 'status', 'code', 'limiter'],
  buckets: [100, 300, 500, 1000, 3000, 5000],
})

/*
* BFF rpc请求耗时
*/
export const RpcTracingHTotalHistogram = new client.Histogram({
  name: `yunfly_rpc_tracing_h_total`,
  help: 'Duration of RPC requests in ms',
  labelNames: ['path', 'host', 'status'],
  buckets: [100, 300, 500, 1000, 3000, 5000],
})

/*
* BFF 其他第三方请求耗时
* 将废弃
*/
export const ThirdTracingHTotalHistogram = new client.Histogram({
  name: `yunfly_third_tracing_h_total`,
  help: 'Duration of third requests in ms',
  labelNames: ['path', 'method', 'status', 'code'],
  buckets: [100, 300, 500, 1000, 3000, 5000],
})

/*
* BFF http请求耗时
*/
export const HttpTracingHTotalHistogram = new client.Histogram({
  name: `yunfly_http_tracing_h_total`,
  help: 'Duration of http requests in ms',
  labelNames: ['path', 'method', 'status'],
  buckets: [100, 300, 500, 1000, 3000, 5000],
})