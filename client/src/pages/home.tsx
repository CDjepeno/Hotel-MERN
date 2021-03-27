import React from 'react'
import  Layout  from '../components/CDLayout';

export interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    return ( 
        <Layout>
            <h1>home</h1>
        </Layout>
     );
}
 
export default Home;