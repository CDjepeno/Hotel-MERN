import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import  Layout  from '../components/CDLayout';
import { FormRoom } from '../components/FormRoom';
import RoomCard from '../components/RoomCard';
import RoomService from '../services/roomsAPI';
import {RoomType} from './Rooms'

type Params = { id: string };

export const Room: React.FC<RouteComponentProps<Params>> = ( ) => {

    const [room, setRoom] = useState<RoomType|null>()

    const { id } = useParams<Params>()    
    
    const fetchData = () => {
        RoomService.getRoom(id)
        .then(room => setRoom(room))
    }

    useEffect(() => {
        fetchData()
    },[id])    

    return (<>
        <Layout>
            {room ? 
                <div>
                    <RoomCard room={room}/>
                    <h1>Editer</h1>
                    <FormRoom id={id} room={room} />
                </div>
            : 
                <h1>Aucune chambre trouver</h1>
            }
        </Layout>
    </>)
}