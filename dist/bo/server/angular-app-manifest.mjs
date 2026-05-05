
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
    'index.csr.html': {size: 56993, hash: '18dfedb10ea30071ba987b02f39352ee565c8cc673683792c9c5e38bb7c2e964', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1776, hash: '30a96aa018686905abe725d23e8a15ce89285fc50bbd9d2e81c8152b7fa0a280', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JGJK44XZ.css': {size: 519960, hash: '74JAWXh7zPY', text: () => import('./assets-chunks/styles-JGJK44XZ_css.mjs').then(m => m.default)}
  },
};
