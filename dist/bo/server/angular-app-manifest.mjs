
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
    'index.csr.html': {size: 57060, hash: 'f0ba2cef16ce8a6f25ce805c0032543c20a0ec4450a179e172d0417c15af7b51', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1790, hash: 'd25e71c1942b2686e3f1d086abf3a0416278ddf8fa940a260da7d6ad96a4450e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-F53JYRNN.css': {size: 521927, hash: 'ehD34iksRXA', text: () => import('./assets-chunks/styles-F53JYRNN_css.mjs').then(m => m.default)}
  },
};
