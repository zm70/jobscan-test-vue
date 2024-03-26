module.exports = {
  chainWebpack: config => {
    config.module
      .rule('typescript')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end()
  }
}

