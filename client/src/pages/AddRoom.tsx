import * as React from 'react';
import  Layout  from '../components/CDLayout';
import { FormAddRoom } from '../components/FormAddRoom';

 
const AddRoom: React.FC = () => {

    return (
        <Layout>
            <div>
                <h1>Ajouter une chambre</h1>
                <FormAddRoom/>
            </div>
        </Layout>  
      );
}
 
export default AddRoom;