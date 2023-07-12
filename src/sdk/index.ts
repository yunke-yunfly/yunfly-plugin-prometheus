const client = require('prom-client');

// default metrics
const metricsInterval = client.collectDefaultMetrics({ prefix: 'yunfly_' })

export * from './counter';
export * from './histogram';

export default client

export const aggregatorRegistry = new client.AggregatorRegistry();

// Graceful shutdown
process.on('SIGTERM', () => {
  clearInterval(metricsInterval)
})