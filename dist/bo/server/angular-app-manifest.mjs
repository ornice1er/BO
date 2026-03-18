
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
    'index.csr.html': {size: 67663, hash: '109f94c4ac0ded30a4639c8a27b87726d0ed345a8559fda0b5dec5b6b3c0cfed', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12446, hash: '25d3eb94233eecb6824e53b449ede18f0162c9b78289100832e6fb78060a5c53', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JUEFRJJP.css': {size: 495568, hash: 'Xf6OLBe9pYI', text: () => import('./assets-chunks/styles-JUEFRJJP_css.mjs').then(m => m.default)}
  },
};
