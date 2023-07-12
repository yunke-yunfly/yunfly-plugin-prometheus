import type { KoaApp } from '@yunflyjs/yunfly';

export type AnyOptionConfig = Record<string, any>;

export interface PrometheusConfig {
  enable?: boolean;
  resCodeKeyName?: string;
  log?: boolean;
  [props: string]: any;
}

export interface PrometheusOption {
  koaApp: KoaApp;
  pluginConfig: PrometheusConfig;
}
