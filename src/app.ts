
import Prometheus from './lib/main';
import type { PrometheusOption } from './types';

/**
 * yunfly prometheus plugin
 *
 * @export
 * @param {*} { app, pluginConfig }
 * @returns {void}
 */
export default function YunflyPrometheusPlugin({ koaApp, pluginConfig }: PrometheusOption): void {
  if (!pluginConfig.enable) {
    return;
  }
  // init prometheus plugin
  Prometheus(koaApp, pluginConfig);
}

