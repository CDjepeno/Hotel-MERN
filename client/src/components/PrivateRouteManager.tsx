import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type Props = {
    path: any,
    component: any
}

export const PrivateRouteManager:React.FC<Props> = ( { path, component } ) => {
    const {isAuthenticatedManager} = useContext(AuthContext)
    return isAuthenticatedManager ? (<Route path={path} component={component}/>) : (<Redirect to='/home'/>)

}