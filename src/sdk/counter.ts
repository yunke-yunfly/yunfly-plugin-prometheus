const client = require('prom-client');

/*
* 客户端请求访问记录
*/
export const ClientRequestTotalCounter = new client.Counter({
  name: 'yunfly_client_request_total',
  help: 'Counter for client total requests received',
  labelNames: ['path', 'method', 'status', 'workerId', 'code', 'limiter'],
})

/*
* BFF grpc请求访问记录
*/
export const RpcRequestTotalCounter = new client.Counter({
  name: 'yunfly_rpc_request_total',
  help: 'Counter for rpc total requests received',
  labelNames: ['path', 'host', 'status'],
})

/*
* BFF http接口请求访问记录
*/
export const HttpRequestTotalCounter = new client.Counter({
  name: 'yunfly_http_request_total',
  help: 'Counter for http total requests received',
  labelNames: ['path', 'method', 'status'],
})

/*
* BFF 错误记录
*/
export const ErrorTotal = new client.Counter({
  name: 'yunfly_error_total',
  help: 'Counter for error',
  labelNames: ['type', 'code'],
})

/*
*  prc error记录
*/
export const RpcErrorTotal = new client.Counter({
  name: 'yunfly_rpc_error_total',
  help: 'Counter for rpc error',
  labelNames: ['type', 'reloadType', 'code', 'path', 'host'],
})


/*
* third http error记录
* 将废弃
*/
export const ThirdErrorTotal = new client.Counter({
  name: 'yunfly_third_error_total',
  help: 'Counter for third http error',
  labelNames: ['code'],
})

/*
* http error记录
*/
export const HttpErrorTotal = new client.Counter({
  name: 'yunfly_http_error_total',
  help: 'Counter for http http error',
  labelNames: ['path', 'method', 'status'],
})


/*
* 进程退出记录
*/
export const ProcessExitTotal = new client.Counter({
  name: 'yunfly_process_exit_total',
  help: 'Counter for process exit',
  labelNames: ['type'],
})



/*
* redis退出记录
*/
export const RedisExitTotal = new client.Counter({
  name: 'yunfly_redis_exit_total',
  help: 'Counter for redis exit',
  labelNames: ['type'],
})



/*
* RPC短连接重连信息
*/
export const ShortGrpcConnectTotal = new client.Counter({
  name: 'yunfly_short_grpc_connect_total',
  help: 'Counter for short rpc connect',
  labelNames: ['host', 'workerId'],
})
