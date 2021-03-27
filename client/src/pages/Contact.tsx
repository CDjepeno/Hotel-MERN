import React from 'react';
import  Layout  from '../components/CDLayout';

type Props = {
    text: string
}

export const Contact: React.FC<Props> = ( { text } ) => {
    return (<>
        <Layout>
            <h1>Contact</h1>
        </Layout>
    </>)
}