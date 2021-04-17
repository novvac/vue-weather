module.exports = {
  lintOnSave: false,

  devServer: {
    proxy: {
      "/api": {
        target: 'http://localhost:8081',
        ws: false,
        changeOrigin: true,
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ],
}
