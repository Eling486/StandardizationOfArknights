const { defaultTheme } = require('vuepress')

module.exports = {
    lang: 'zh-CN',
    title: '明日方舟标准化',
    description: 'Standardization Of Arknights - 明日方舟标准化',
    base: '/StandardizationOfArknights/docs/',
    theme: defaultTheme({
        // 默认主题配置
        navbar: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: '友情链接',
                children: [
                    {
                        text: '友链1',
                        link: '/test',
                    },
                    {
                        text: '友链2',
                        link: '/test',
                    },
                ],
            },
        ],
        logo: '/img/logo.png',
        sidebar: [
            
            '/standards/README.md',
            {
                children: [
                    {
                        text: '标准化数据ID',
                        link: '/standards/ids',
                        children: [
                            '/standards/ids/chars.md',
                        ]
                    },
                    '/standards/replay.md'
                ]
            }
        ],
    }),
}