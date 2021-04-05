import React, { useContext } from 'react';
import { Layout, Menu } from 'antd'
import Button from "antd-button-color";
import { Link, useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import AuthenticationService from '../services/authAPI';

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

    const { isAuthenticatedManager, setIsAuthenticatedManager} = useContext(AuthContext);
    const { isAuthenticatedUser, setIsAuthenticatedUser} = useContext(AuthContext);

    const history = useHistory()
    
    const handleLogout = () => {
        AuthenticationService.logout()
        setIsAuthenticatedUser(false)
        setIsAuthenticatedManager(false)
        history.replace('/')
    }

    return ( 
        <Layout>
            <Header>
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
                    {!isAuthenticatedUser && !isAuthenticatedManager  && 
                        <Menu.Item key='1'>
                        <Link to='/'>Acceuil</Link> 
                        </Menu.Item>
                    }
                    {isAuthenticatedUser || isAuthenticatedManager ?
                        <Menu.Item key='2'>
                            <Link to='/rooms'>Chambres</Link> 
                        </Menu.Item>
                    :null
                    }
                    <Menu.Item key='3'>
                       <Link to='/about'>A propos</Link> 
                    </Menu.Item>
                    <Menu.Item key='4'>
                       <Link to='/contact'>Contact</Link> 
                    </Menu.Item>
                    {isAuthenticatedManager ?     
                        <Menu.Item key='5'>
                            <Link to='/addRoom'>Ajouter une chambre</Link> 
                        </Menu.Item>
                    :null
                    }
                    {!isAuthenticatedManager && !isAuthenticatedUser ?
                        <Menu.Item key='5'>
                            <Link to='/register'>S'enregistrer</Link> 
                        </Menu.Item>
                    :null
                    }
                    {isAuthenticatedUser || isAuthenticatedManager ?
                        <Menu.Item key='5'>
                            <Button onClick={handleLogout} type="danger">Se déconnecter</Button>
                        </Menu.Item>
                    :null
                    }
                    
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