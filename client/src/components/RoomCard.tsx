import * as React from 'react'
import { Card, Badge, Image } from 'antd'

const { Meta } = Card

export interface RoomCardProps {
    room: {
        _id: string,
        name: string,
        price: number,
        maxPersons: number
    } 
}
 
const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    return ( <>
        <div style={{ width: 300, margin: '1rem' }}>
            <Badge count='PROMO'>
                <Card 
                    title={room.name}
                    cover={
                        <img 
                            style={{ 
                                width: '300px',
                                height: '350px',
                                objectFit: 'cover'
                            }}
                            alt={room.name}
                            src={`https://source.unsplash.com/random/${Math.ceil(Math.random() * 1000 + 300 )}x350/?bed`}
                        />
                    }
                >  
                    <Meta title={`${room.price} € / nuits `} description={`Nombre de personnes maximum : ${room.maxPersons}`} />
                </Card>
            </Badge>
        </div>
    </>);
}
 
export default RoomCard;