import React from 'react';
import  Layout  from '../components/CDLayout';

type Props = {
    text: string
}

export const Rooms: React.FC<Props> = ( { text } ) => {
    return (<>
        <Layout>
            <h1>CHAMBRES</h1>
        </Layout>
    </>)
}