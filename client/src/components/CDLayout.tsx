import React from 'react';
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

export interface CDLayoutProps {
    children: any
}

const { Header, Content, Footer } = Layout

const contentStyle = {
    display: 'flex',
    flexwrap: 'wrap',
    padding: '3rem 3rem', 
    justifyContent: 'center'
}
 
const CDLayout : React.FC<CDLayoutProps> = ({ children }) => {
    return ( 
        <Layout>
            <Header>
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1'>
                       <Link to='/'>Acceuil</Link> 
                    </Menu.Item>
                    <Menu.Item key='2'>
                       <Link to='/rooms'>Chambres</Link> 
                    </Menu.Item>
                    <Menu.Item key='3'>
                       <Link to='/about'>A propos</Link> 
                    </Menu.Item>
                    <Menu.Item key='4'>
                       <Link to='/contact'>Contact</Link> 
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={contentStyle} children={children} />
            <Footer style={{ textAlign:'center' }}>
                CDjepeno Copyright 2021
            </Footer>
        </Layout>
     );
}
 
export default CDLayout;