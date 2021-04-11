import * as React from 'react'
import { Card, Badge } from 'antd'
import imageRoom1 from '../assets/images/royal.jpg'
import imageRoom2 from '../assets/images/chambre2.jpg'
import imageRoom3 from '../assets/images/prince.jpeg'
import imageRoom4 from '../assets/images/chambre4.jpg'
const { Meta } = Card

export interface RoomCardProps {
    room: {
        _id: string,
        name: string,
        price: number,
        maxPersons: number, 
        image: string
    } 
}
 
const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
     
   let imgToPrint;
   switch(room.image){
       case "royal.jpg" : imgToPrint = imageRoom1
       break;
       case "chambre2.jpg" : imgToPrint = imageRoom2
       break;
       case "prince.jpeg" : imgToPrint = imageRoom3
       break;
       case "chambre4.jpg" : imgToPrint = imageRoom4
       break;
   }
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
                            src={imgToPrint}
                        />
                    }
                >  
                    <Meta title={`${room.price} € / nuit `} description={`Nombre de personnes maximum : ${room.maxPersons}`} />
                </Card>
            </Badge>
        </div>
    </>);
}
 
export default RoomCard;