
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
    'index.csr.html': {size: 1099, hash: 'c05f6009410286b1e419359f7c7ad745f1804c9a327ba9ad40817f5b536febd7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1639, hash: 'd35c56ddb5040ea9c43cf72de34abb7fc520c874483cebbedebf0a6338e5a024', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}
  },
};
