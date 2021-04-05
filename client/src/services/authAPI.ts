import { LOGIN_API, REGISTER_API } from '../config';
import axios from "axios";
import jwtDecode from "jwt-decode"



export default class AuthenticationService {

    static login (credentials: object): Promise<any> { 
        return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data)
            .then(data => {                                    
                window.localStorage.setItem("authToken", data.accesstoken)
                this.setAxiosToken(data.accesstoken)

                window.localStorage.setItem("roles", data.user[0].role)
            })
            .catch(error => console.log(error))
    }

    static register(user: object) {
        return axios
            .post(REGISTER_API, user)
            .then(response => response.data)
            .catch(err => this.handleError(err))
    }

    static logout() {
        window.localStorage.removeItem('authToken')
        delete axios.defaults.headers["Authorization"];
        window.localStorage.removeItem('roles')

    }

    static isAuthenticatedUser() {
        const token = window.localStorage.getItem('authToken')
        const role = window.localStorage.getItem('roles')

        if(role) {
            console.log(role.split(','));
        }
        
        
        if(token) {
            const jwtData = jwtDecode(token)

            if(jwtData.exp > new Date().getTime() / 1000) {
                if(role && role.split(',').every(a => a === "user")) {
                    return true
                } else {
                    return false
                }
            }
        }
        return false
    }


    static isAuthenticatedManager() {
        const token = window.localStorage.getItem('authToken')
        const role = window.localStorage.getItem('roles')
        
        if(token) {
            const jwtData = jwtDecode(token)

            if(jwtData.exp > new Date().getTime() / 1000) {
                if(role && role.split(',').includes("manager") && role.split(',').includes("user") ) {
                    return true 
                } else {
                    return false
                }
            }
        }
        return false
    }

    static setAxiosToken(token: string) {
        axios.defaults.headers["Authorization"] = "Bearer" + token
    }

    static handleError(error: Error):void {
        console.log(error)
    }

}