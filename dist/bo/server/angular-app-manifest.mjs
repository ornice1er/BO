
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
    'index.csr.html': {size: 56993, hash: 'c22467f340d058af9e95c368752705152f2b4845c2f8ce0f6856725455213c54', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1776, hash: '76db7e036d72729bb78b1c7d03c670b5707b213603d52519e2f3b5e806c8c3a6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-SD3T7DTI.css': {size: 495728, hash: 'w8puJgMvze8', text: () => import('./assets-chunks/styles-SD3T7DTI_css.mjs').then(m => m.default)}
  },
};
