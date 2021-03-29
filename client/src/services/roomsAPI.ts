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

    static upddateRoom(object: RoomType, id: string): Promise<Object> {
        return axios
        .put(ROOM_API + id 
        , {
             ...object,
            object: object
        })
        .then(response => response.data)
        .catch(error => this.handleError(error));
    }

    static deleteRoom(id: any) {
        return axios
        .delete(ROOM_API + id)
        .then(response => response.data)
        .catch(error => this.handleError(error));
    }

    static addRoom(object: RoomType): Promise<object> {
        return axios
        .post(ROOMS_API, {
        ...object,
        })
        .then(response => response.data)
        .catch(error => this.handleError(error))
    }

    
    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error):void {
        console.error(error)
    }

}