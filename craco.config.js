const path = require('path');
const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require('craco-less');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    webpack: {
        alias:{
            '@': resolve('src'),
        }
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin
        },
        {
          plugin: CracoLessPlugin,
          options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
