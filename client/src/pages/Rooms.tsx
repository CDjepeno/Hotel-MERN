import React, { useContext, useEffect, useState } from 'react';
import  Layout  from '../components/CDLayout';
import RoomService from '../services/roomsAPI';
import RoomCard from '../components/RoomCard'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

export type RoomType = {
    _id: string,
    name: string,
    price: number,
    maxPersons: number,
    image: string
}

export const Rooms: React.FC = () => {

    const [rooms, setRooms] = useState<RoomType[]>([]) 

    const { isAuthenticatedManager, setIsAuthenticatedManager} = useContext(AuthContext);
    const { isAuthenticatedUser, setIsAuthenticatedUser} = useContext(AuthContext);    

    console.log(isAuthenticatedManager);
    console.log(isAuthenticatedUser);
    

    const fetchData = () => {
        RoomService
            .getRooms()
            .then(rooms => setRooms(rooms))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchData()
    },[])
    
    return (<>
        <Layout>  
            {rooms && rooms.map(room => (
                <Link key={room._id} to={`/rooms/${room._id}`}>
                    <RoomCard room={room}/>
                </Link>
            ) )}
        </Layout>
    </>)
}