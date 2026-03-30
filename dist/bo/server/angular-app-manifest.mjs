
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-IPGCH4IW.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 56883, hash: 'd883c0db955f75a428993d58f9b35e80cb5851f3dee85c8f6942da00c6205e20', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1666, hash: 'a671f9a2051ab2d70d376d53e39b3f8e6e20d9fe547dd6f08c2896f62089d43a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JUEFRJJP.css': {size: 495568, hash: 'Xf6OLBe9pYI', text: () => import('./assets-chunks/styles-JUEFRJJP_css.mjs').then(m => m.default)}
  },
};
