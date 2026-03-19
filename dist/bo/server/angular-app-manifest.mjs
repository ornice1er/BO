
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
    'index.csr.html': {size: 67663, hash: '256da9f3503711f87c234e85005595865135b35e3b2387455da8e24f00ed8f3e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12446, hash: 'ad88b666545c2566fb9a98f9a5f8ed16b40e544434c8563e2d57448bd2116e3e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JUEFRJJP.css': {size: 495568, hash: 'Xf6OLBe9pYI', text: () => import('./assets-chunks/styles-JUEFRJJP_css.mjs').then(m => m.default)}
  },
};
