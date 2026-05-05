
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
    'index.csr.html': {size: 57060, hash: 'd9510a358673e846fd5e2206bb63d07906253927c61710087e61eebf1884f630', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1790, hash: '0e746e13065ac11193624301da96a9417852753b7cd76cbcf3d6461f0ad5ca6f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-F53JYRNN.css': {size: 521927, hash: 'ehD34iksRXA', text: () => import('./assets-chunks/styles-F53JYRNN_css.mjs').then(m => m.default)}
  },
};
