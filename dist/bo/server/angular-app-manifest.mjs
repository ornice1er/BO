
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-4BIGCTL5.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 1099, hash: '26f6c18b702bcc73a05bb9417f3ef82a6f9ecf5b7276bdadea5bbd32f1eaa086', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1639, hash: 'aaa728814c0f5ca5cfaa53638f730a779dae27b7ffbc6eed7aff9c6c4ab77f16', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}
  },
};
