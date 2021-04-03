import * as React from 'react';
import  Layout  from '../components/CDLayout';
import { FormAddRoom } from '../components/FormAddRoom';

 
const AddRoom: React.FC = () => {

    return (
        <Layout>
            <h1>Ajouter</h1>
            <FormAddRoom/>
        </Layout>  
      );
}
 
export default AddRoom;