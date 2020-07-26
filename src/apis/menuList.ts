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
    },
    {
        id: 'css',
        title: 'CSS相关学习',
        icon: 'LaptopOutlined'
    }
]
export default menuList;