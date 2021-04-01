import * as React from 'react';
import  Layout  from '../components/CDLayout';
import { FormRoom } from '../components/FormRoom'

 
const AddRoom: React.FC = () => {
    const room = {
        _id: "",
        name: "",
        price:0,
        maxPersons: 0,    
    }

    return (
        <Layout>
            <h1>Ajouter</h1>
            <FormRoom room={room} addRoom={true}/>
        </Layout>  
      );
}
 
export default AddRoom;