import React from 'react'
import  Layout  from '../components/CDLayout';
import { FormRegister } from '../components/FormRegister';

 
export const Register: React.FC = () => {
    return ( <>
        <Layout>
            <div>
                <h1>S'enregistrer</h1>
                <FormRegister />
            </div>
        </Layout>
    </>);
}
 
