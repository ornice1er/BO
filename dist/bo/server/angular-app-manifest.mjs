
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/ngx-quill/fesm2022/ngx-quill-quill-CUw8Q_m0.mjs": [
    {
      "path": "chunk-XLZOUWF7.js",
      "dynamicImport": false
    }
  ],
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-266HUTDW.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 56994, hash: 'b6930ef4cbef481c243795c03f5e037f6484a79be23234fffbc347314cae2524', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1777, hash: 'b66fe35c0cd0dfd487f059781a5765880bad1e65e3881d959b4db0067f1248a1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-SD3T7DTI.css': {size: 495728, hash: 'w8puJgMvze8', text: () => import('./assets-chunks/styles-SD3T7DTI_css.mjs').then(m => m.default)}
  },
};
