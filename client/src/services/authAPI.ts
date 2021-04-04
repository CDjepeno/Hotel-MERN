import { LOGIN_API, REGISTER_API } from '../config';
import axios from "axios";
import jwtDecode from "jwt-decode"



export default class AuthenticationService {

    static login (credentials: object): Promise<any> { 
        return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data.accesstoken)
            .then(token => {                
                window.localStorage.setItem("authToken", token)
                this.setAxiosToken(token)
            })
            .catch(err => this.handleError(err))
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
    }

    static isAuthenticated() {
        const token = window.localStorage.getItem('authToken')

        if(token) {
            const jwtData = jwtDecode(token)

            if(jwtData.exp > new Date().getTime() / 1000) {
                return true
            }
            return false
        }
        return false
    }


    static setAxiosToken(token: string) {
        axios.defaults.headers["Authorization"] = "Bearer" + token
    }

    static handleError(error: Error):void {
        console.error(error)
    }

}