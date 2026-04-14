
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
    'index.csr.html': {size: 56993, hash: 'a0cc18dfa8e36c9471870248dc281740081fbd044e5309f6a30ef36035514422', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1776, hash: 'c0579c25c4103b3c2a3f4c0ddb90bbc82e782eb8fde144faa9d0dd653be69acd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-SD3T7DTI.css': {size: 495728, hash: 'w8puJgMvze8', text: () => import('./assets-chunks/styles-SD3T7DTI_css.mjs').then(m => m.default)}
  },
};
