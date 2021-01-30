const { 
  override,
  // overrideDevServer,
  // fixBabelImports,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')

// 禁用manifast
// const removeManifest = () => config => {
//   config.plugins = config.plugins.filter(
//     p => p.constructor.name !== "ManifestPlugin"
//   )
//   return config
// }

// const addProxy = () => (configFunction) => {
//   configFunction.proxy = {
//     '/api': {
//       target: 'https://www.v2ex.com',
//       changeOrigin: true,
//       pathRewrite: { '^/api': '/' },
//     },
//   }

//   return configFunction
// }

module.exports = {
  webpack: override(
    // fixBabelImports('import', {
    //   libraryName: 'antd',
    //   libraryDirectory: 'es',
    //   style: 'css'
    // }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    // removeManifest()
  )
  // devServer: overrideDevServer(
  //   addProxy()
  // )
}