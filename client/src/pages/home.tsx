import React from 'react'
import  Layout  from '../components/CDLayout';
import { FormLogin } from '../components/FormLogin';

 
const Home: React.FC = () => {
    return ( <>
        <Layout>
            <FormLogin />
        </Layout>
    </>);
}
 
export default Home;