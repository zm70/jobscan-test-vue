const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'axios',
    'vue-awesome',
    'lodash-es',
  ]
});


