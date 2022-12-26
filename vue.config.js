const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, 
  
  devServer : {
    proxy : {
      '/board101' : {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },

      '/item101' : {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },
      
      '/member101' : {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      }
    }
  }
})
