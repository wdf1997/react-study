import React from 'react';
import { Menu, Layout } from 'antd';
import { BrowserRouter as Router, Link } from "react-router-dom";
import MenuRoute from '../../router';
import menuList from '../../apis/menuList';
import { DesktopOutlined } from '@ant-design/icons'
const { SubMenu } = Menu;
const { Header, Sider } = Layout;

export default class Home extends React.Component {
    componentDidMount() {
        this.setStyle()
    }
    // 获取菜单列表
    renderMenuList = (menu: any) => {
        return menu.map((item: any) => {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.id}
                        title={item.title}
                        icon={<DesktopOutlined />}
                    >
                        {this.renderMenuList(item.children)}
                    </SubMenu>
                )
            } else {
                return <Menu.Item key={item.id} icon={item.pid ? '': <DesktopOutlined />}><Link to={item.pid ? `/${item.pid}/${item.id}` : `/${item.id}`}>{item.title}</Link></Menu.Item>
            }
        })
    }
    setStyle = () => {
        const height = document.documentElement.clientHeight;
        const homeContent: any = document.querySelector('.home');
        homeContent.style.height = `${height}px`;
    }
    render() {
        const menuData = this.renderMenuList(menuList)
        return (
            <Router>
                <Layout className="home">
                    <Header className="header">
                        <h2 style={{color: "#fff"}}>我的学习记录</h2>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['reactRef']}
                                defaultOpenKeys={['react']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {menuData}
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <div
                                className="home-content"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <MenuRoute />
                            </div>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}