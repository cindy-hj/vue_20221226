const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, 
  
  configureWebpack:{
    performance: { 
      hints: false,
    },
    optimization:{
      minimize:true,
      splitChunks:{
        chunks: 'all',
      }
    }
  },
  
  devServer : {
    proxy : {
      '/api' : { // 내가 만든 백엔드 호출
        target : 'http://127.0.0.1:3000',
        changeOrigin : true,
        logLevel : 'debug'
      },
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
