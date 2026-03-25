
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-5ZSELZSY.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 56883, hash: '543c74466e44fe6334b762e2c8931d6050fe3ac5e4ccb757108f58a396251d8b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1666, hash: '961f6f49c4ac47bdae7bf99d47089b4baf84db2f1ca8de81df527bf695ea4adc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JUEFRJJP.css': {size: 495568, hash: 'Xf6OLBe9pYI', text: () => import('./assets-chunks/styles-JUEFRJJP_css.mjs').then(m => m.default)}
  },
};
