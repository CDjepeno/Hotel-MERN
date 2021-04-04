import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import AuthContext from '../context/AuthContext';

type Props = {
    path: string,
    component: any
}

export const PrivateRoute:React.FC<Props> = ( { path, component } ) => {
    const {isAuthenticated} = useContext(AuthContext)
    return isAuthenticated ? (<Route path={path} component={component}/>) : (<Redirect to='/home'/>)
}