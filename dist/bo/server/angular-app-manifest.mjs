
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
    'index.csr.html': {size: 57060, hash: '82bf74744cd431bede25714dc61f06563732dd1350c1a5539276ef8c94997c87', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1790, hash: 'eb50618a708f01c7e57bfbe14b64f634aa0b3b25a528d79e659e000bfd084e05', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-F53JYRNN.css': {size: 521927, hash: 'ehD34iksRXA', text: () => import('./assets-chunks/styles-F53JYRNN_css.mjs').then(m => m.default)}
  },
};
