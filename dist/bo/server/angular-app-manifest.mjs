
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
    'index.csr.html': {size: 56892, hash: '570cb4aa07c034b730668ab0c91cf3f09490f9ac67cae4e6275f92af07012bd3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1675, hash: 'a90156d05eed9f548a38be37ee4b6a27633425e3359ddc5ef7388c110c886379', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JUEFRJJP.css': {size: 495568, hash: 'Xf6OLBe9pYI', text: () => import('./assets-chunks/styles-JUEFRJJP_css.mjs').then(m => m.default)}
  },
};
