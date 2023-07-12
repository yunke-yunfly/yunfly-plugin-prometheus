import type { Config } from '@yunflyjs/yunfly';

/**
 * default config
 *
 * @export
 * @param {KoaApp} app
 * @returns
 */
export default function config(): Config {
  const config: Config = {};

  config.prometheus = {
    enable: true,
    log: false,
    resCodeKeyName: 'code',
  };

  return config;
}
