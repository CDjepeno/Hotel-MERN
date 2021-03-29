import * as React from 'react';
import  Layout  from '../components/CDLayout';
import { FormRoom } from '../components/FormRoom'

export interface AddRoomProps {
    
}
 
const AddRoom: React.FC<AddRoomProps> = () => {
    const id = 'erfdsf'
    const room = {
        _id: "sdfsqfsq",
        name: "chaise",
        maxPersons: 45,    
    }
    const setRoom = {}

    return (
        <Layout>
            <h1>Ajouter</h1>
            <FormRoom id={id} room={room} setRoom={setRoom} addRoom={true}/>
        </Layout>  
      );
}
 
export default AddRoom;