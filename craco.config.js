const {CracoAliasPlugin} = require('react-app-alias')
const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoAliasPlugin,
            options: {}
        },
        { plugin: CracoAntDesignPlugin },
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#5070B1' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ]
};
