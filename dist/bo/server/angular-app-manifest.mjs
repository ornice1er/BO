
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
    'index.csr.html': {size: 56994, hash: 'c2e4235545d32d3273756393c2be5d75d6e1fbb6ec75cc4fcb4538448561a327', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1777, hash: '474fac809898eb97906a1d4ba521a2473895080082705e00cf336efd679cab69', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-SD3T7DTI.css': {size: 495728, hash: 'w8puJgMvze8', text: () => import('./assets-chunks/styles-SD3T7DTI_css.mjs').then(m => m.default)}
  },
};
