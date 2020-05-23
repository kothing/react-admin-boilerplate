import React from 'react'
import {
    HomeOutlined,
    AppstoreOutlined,
    CompassOutlined,
    FormOutlined,
    PieChartOutlined,
    PaperClipOutlined,
    BarsOutlined,
    UserOutlined,
    FundViewOutlined
} from '@ant-design/icons'

const menus = [
    {
        key: '/index',
        title: '首页',
        icon: <HomeOutlined />,
        auth: [1]
    },
    {
        title: '通用',
        key: '/public',
        icon: <AppstoreOutlined />,
        auth: [1],
        subs: [
            { title: '按钮', key: '/public/button', icon: '' },
            { title: '图标', key: '/public/icon', icon: '' }
        ]
    },
    {
        title: '导航',
        key: '/nav',
        icon: <CompassOutlined />,
        subs: [
            { title: '下拉菜单', key: '/nav/dropdown', icon: '' },
            { title: '导航菜单', key: '/nav/menu', icon: '' },
            { title: '步骤条', key: '/nav/steps', icon: '' }
        ]
    },
    {
        title: '表单',
        key: '/form',
        icon: <FormOutlined />,
        subs: [
            { title: '基础表单', key: '/form/base-form', icon: '' },
            { title: '步骤表单', key: '/form/step-form', icon: '' }
        ]
    },
    {
        title: '展示',
        key: '/show',
        icon: <PieChartOutlined />,
        subs: [
            { title: '表格', key: '/show/table', icon: '' },
            { title: '折叠面板', key: '/show/collapse', icon: '' },
            { title: '树形控件', key: '/show/tree', icon: '' },
            { title: '选项卡', key: '/show/tabs', icon: '' }
        ]
    },
    {
        title: '其它',
        key: '/others',
        icon: <PaperClipOutlined />,
        auth: [1],
        subs: [
            { title: '进度条', key: '/others/progress', icon: '' },
            { title: '动画', key: '/others/animation', icon: '' },
            { title: '上传', key: '/others/upload', icon: '' },
            { title: '富文本', key: '/others/editor', icon: '' },
            { title: '404', key: '/404', icon: '' },
            { title: '500', key: '/500', icon: '' }
        ]
    },
    {
        title: '多级导航',
        key: '/level1',
        icon: <BarsOutlined />,
        subs: [
            {
                title: '二级',
                key: '/level1/level2',
                icon: '',
                subs: [{ title: '三级', key: '/level1/level2/level3', icon: '' }]
            }
        ]
    },
    {
        title: '关于',
        key: '/about',
        icon: <UserOutlined />,
        auth: [1]
    },
    {
        title: '示例',
        key: '/test',
        icon: <FundViewOutlined />,
        auth: [1],
        subs: [
            { title: '示例1', key: '/test/example1', icon: '' },
            { title: '示例2', key: '/test/example2', icon: '' }
            // { title: '示例3', key: '/test/example3', icon: '' },
        ]
    }
]

export default menus
