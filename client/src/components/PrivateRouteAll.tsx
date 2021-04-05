import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type Props = {
    path: any,
    component: any
}

export const PrivateRouteAll:React.FC<Props> = ( { path, component } ) => {
    const {isAuthenticatedUser} = useContext(AuthContext)
    const {isAuthenticatedManager} = useContext(AuthContext)
    return isAuthenticatedUser || isAuthenticatedManager ? (<Route path={path} component={component}/>) : (<Redirect to='/home'/>)

}