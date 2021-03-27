import React from 'react';
import  Layout  from '../components/CDLayout';

type Props = {
    text: string
}

export const About: React.FC<Props> = ( { text } ) => {
    return (<>
        <Layout>
            <h1>About</h1>
        </Layout>
    </>)
}   