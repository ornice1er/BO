
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
    'index.csr.html': {size: 56994, hash: '175da46a14a453ee6424184e5d5d899d8a370f206cfda45c381d9c801989a813', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1777, hash: '9eb446baf97244a595164d26b5bc9ca15a5c9ec3586d53951438d48cd83e81c5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-SD3T7DTI.css': {size: 495728, hash: 'w8puJgMvze8', text: () => import('./assets-chunks/styles-SD3T7DTI_css.mjs').then(m => m.default)}
  },
};
