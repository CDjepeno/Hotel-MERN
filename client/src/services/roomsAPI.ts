import axios from "axios";
import { ROOMS_API, ROOM_API } from "../config";
import {RoomType} from '../pages/Rooms'

export default class RoomService {

    static getRooms(): Promise<any> {
        return axios
        .get(ROOMS_API)
        .then(response => response.data)
        .catch(error => this.handleError(error));
    }

    static getRoom(id: string): Promise<RoomType|null> {
        return axios
        .get(ROOM_API + id)
        .then(response => response.data)
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error));
    }

    // static putobject(object: object, id): Promise<Object> {
    //     return axios
    //     .put(url + '/' + id 
    //     , {
    //          ...object,
    //         object: object
    //     })
    // }

    // static addobject(object: object): Promise<object> {
    //     return axios
    //     .post(url, {
    //     ...object,
    //     })
    //     .then(response => response.data)
    //     .catch(error => this.handleError(error))
    // }

    // static deleteobject(id) {
    //     return axios
    //     .delete(url + '/' + id)
    // }

    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error):void {
        console.error(error)
    }

}