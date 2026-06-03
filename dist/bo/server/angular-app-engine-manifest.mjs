
export default {
  basePath: 'https://preprodmtfp.gouv.bj/pprod-bo',
  allowedHosts: [],
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
