
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-5ZSELZSY.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 67663, hash: '5a4a97e05f39487853049f2b0e4598fdd9aac2d79030c710b8d87a83f238a874', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12446, hash: 'ea09e9e027c1faf858b8fb756a6d8702398f760354ba392d6cfdb24d6bcb09a6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JUEFRJJP.css': {size: 495568, hash: 'Xf6OLBe9pYI', text: () => import('./assets-chunks/styles-JUEFRJJP_css.mjs').then(m => m.default)}
  },
};
