
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
      "path": "chunk-AO6COSFW.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 56994, hash: 'f58d72a0a0d1df3a03517e03e3781461958c5389e7689a19fd69a3cf3a8a7451', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1777, hash: 'c54204f3573bbe19badf1dedd79006bd46811cea347b7d59936586f8df434824', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JGJK44XZ.css': {size: 519960, hash: '74JAWXh7zPY', text: () => import('./assets-chunks/styles-JGJK44XZ_css.mjs').then(m => m.default)}
  },
};
