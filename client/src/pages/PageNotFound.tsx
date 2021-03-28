import React from 'react';
import  Layout  from '../components/CDLayout';

type Props = {
    text: string
}

export const PageNotFound: React.FC<Props> = ( { text } ) => {
    return (
        <Layout>
            <h1>Error 404 PageNotFound</h1>
        </Layout>
    )
}           