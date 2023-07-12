# @yunflyjs/yunfly-plugin-prometheus

yunfly prometheus plugin.

## Usage

1. install

```bash
yarn add @yunflyjs/yunfly-plugin-prometheus
```

2. declare plugins in **config/config.plugin.ts**

```ts
/**
 * yunfly plugin
 */
const plugins: {[key:string]: string}[] = [
  {
    name: 'prometheus',
    package: '@yunflyjs/yunfly-plugin-prometheus'
  }
];
// 
export default plugins;
```

3. enable plugins in **config/config.default.ts**

```js
config.prometheus = {
  enable: true,
}
```

4. open 'http://127.0.0.1:9000/metrics'

```js
open http://127.0.0.1:9000/metrics
```

more information：https://yunke-yunfly.github.io/doc.github.io/document/technology/prometheus




