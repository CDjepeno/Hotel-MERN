import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, useParams } from 'react-router';
import  Layout  from '../components/CDLayout';
import { FormUpdateRoom } from '../components/FormUpdateRoom';
import RoomCard from '../components/RoomCard';
import RoomService from '../services/roomsAPI';
import {RoomType} from './Rooms'
import Button from "antd-button-color";
import AuthContext from '../context/AuthContext';

type Params = { id: string };

export const Room: React.FC<RouteComponentProps<Params>> = () => {

    const [room, setRoom] = useState<RoomType|null>()
    const [UpdateRoom,setUpdateRoom] = useState(false)
    const { isAuthenticatedManager } = useContext(AuthContext);
    const { id } = useParams<Params>()    
    const history = useHistory()

    
    const fetchData = () => {
        RoomService.getRoom(id)
        .then(room => setRoom(room))
    }

    const handleDelete = () => {
        RoomService.deleteRoom(id)
        history.replace('/rooms')
    }

    const handleUpdate = () => {
      
        setUpdateRoom(!UpdateRoom)
    }

    useEffect(() => {
        fetchData()
    },[id])    

    return (<>
        <Layout>
            {room ? 
                <div>
                    <RoomCard room={room}/>
                    {isAuthenticatedManager && 
                        <> 
                            <Button type="primary" style={{ marginLeft : '1rem' }} onClick={handleUpdate}>
                                Modifier
                            </Button>
                            <Button type="danger" style={{ marginLeft : '1rem' }} onClick={handleDelete}>
                                Supprimer
                            </Button>
                            {UpdateRoom &&
                                <FormUpdateRoom id={id} room={room}/>    
                            }
                        </>                
                    }  
                </div>
            : 
                <h1>Aucune chambre trouver</h1>
            }
        </Layout>
    </>)
}