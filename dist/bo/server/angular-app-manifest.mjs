
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/quill/quill.js": [
    {
      "path": "chunk-Y237BO4B.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-ZRAC4FBK.js",
      "dynamicImport": false
    }
  ],
  "node_modules/ngx-quill/fesm2022/ngx-quill-quill-CUw8Q_m0.mjs": [
    {
      "path": "chunk-MRJRTGFR.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-ZRAC4FBK.js",
      "dynamicImport": false
    }
  ],
  "node_modules/quill-html-edit-button/dist/quill.htmlEditButton.min.js": [
    {
      "path": "chunk-7JBIHLXR.js",
      "dynamicImport": false
    }
  ],
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-AJRWIOD5.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 57060, hash: '54f805797853500b8d737f7395909cdb0599c0d4be5b1385b8474e88c71b983b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1790, hash: 'eaed38069e0db76d17f7ac2dc9ebb23d37285710cfdd94447638966f12d571b6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-F53JYRNN.css': {size: 521927, hash: 'ehD34iksRXA', text: () => import('./assets-chunks/styles-F53JYRNN_css.mjs').then(m => m.default)}
  },
};
