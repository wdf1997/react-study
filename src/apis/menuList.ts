const menuList = [
    {
        id: 'react',
        title: 'React学习',
        icon: 'LaptopOutlined',
        children: [{
            id: 'coreConcept',
            pid: 'react',
            title: 'React核心概念'
        },{
            id: 'hoc',
            pid: 'react',
            title: '高阶指引'
        },{
            id: 'hook',
            pid: 'react',
            title: 'Hook'
        }]
    },
    {
        id: 'npm',
        title: 'npm相关学习',
        icon: 'LaptopOutlined',
        children: [{
            id: 'first',
            pid: 'npm',
            title: '快速入门'
        },{
            id: 'command',
            pid: 'npm',
            title: '命令行'
        },{
            id: 'useNpm',
            pid: 'npm',
            title: 'npm用法'
        }]
    },
    {
        id: 'css',
        title: 'CSS相关学习',
        icon: 'LaptopOutlined',
        children: [{
            id: 'first',
            pid: 'npm',
            title: '快速入门'
        }]
    },
    {
        id: 'less',
        title: 'Less相关学习',
        icon: 'LaptopOutlined',
        children: [{
            id: 'Variables',
            pid: 'less',
            title: '变量（Variables）'
        },{
            id: 'Mixins',
            pid: 'less',
            title: '混合（Mixins）'
        },]
    },
    {
        id: 'webpack',
        title: 'webpack相关学习',
        icon: 'LaptopOutlined'
    },
    {
        id: 'reactRouter',
        title: 'router相关学习',
        icon: 'LaptopOutlined',
        children: [{
            id: 'router',
            pid: 'reactRouter',
            title: 'react-router学习',
        },{
            id: 'routerDOM',
            pid: 'reactRouter',
            title: 'react-router-dom学习',
        }]
    }
]
export default menuList;