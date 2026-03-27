
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
    'index.csr.html': {size: 56883, hash: 'a4ae1372d05b137b75fef16d342692c8d35de889fb2185b3e85513f3f01fc26e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1666, hash: 'b5b0ece1315da064e3d9e668aeaebdf1cdd3f1b1bdfe868c770975ff6a533c04', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JUEFRJJP.css': {size: 495568, hash: 'Xf6OLBe9pYI', text: () => import('./assets-chunks/styles-JUEFRJJP_css.mjs').then(m => m.default)}
  },
};
