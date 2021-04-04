import Layout from 'antd/lib/layout/layout';
import React from 'react';
import { FormUpdateRoom } from '../components/FormUpdateRoom';
import RoomCard from '../components/RoomCard';


type Props = {
    id: string,
    room: { 
        _id: string,
        name: string,
        price: number,
        maxPersons: number
    }
}

export const UpdateRoom: React.FC<Props> = ( { room, id } ) => {
    return (
        <Layout>
            {room ? 
                <div>
                    <RoomCard room={room}/>
                    <h1>Editer</h1>
                    <FormUpdateRoom id={id} room={room} />
                </div>
            : 
                <h1>Aucune chambre trouver</h1>
            }
        </Layout>
    )
}