import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import Button from "antd-button-color";
import RoomService from '../services/roomsAPI';
import { useHistory } from 'react-router';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type Props = { 
    id?: string,
    room?: { 
        _id: string,
        name: string,
        price: number,
        maxPersons: number
    }
    addRoom?: boolean
}

type FormType = { 
  name: string,
  price: number,
  maxPersons: number
}

export const FormRoom: React.FC<Props>= ({id, room, addRoom}) => {
  const [values, setValues] = useState<FormType|null>(null)
  const history = useHistory()
  
  useEffect(() => {
    setValues(room ? room : null)     
  },[room,id])


  const onFinish = (values: any) => {
    if(!addRoom && id) {
      RoomService.upddateRoom(values,id)
     .then(response => console.log(response))
    }else {
      RoomService.addRoom(values)
      .then(response => console.log(response))
      .catch(err => console.error(err))
      history.replace('/rooms')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleDelete = () => {
    RoomService.deleteRoom(id)
    history.replace('/rooms')
  }

  if(!values) return null

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Nom"
        name="name"
        initialValue={values.name}
        rules={[{ required: true, message: 'Veuillez entré le nom de la chambre!' }]}
      >
        <Input 
          value={values.name} 
          name='name' 
          onChange={(e) => setValues({...values, name:e.target.value})}
        />
      </Form.Item>

      <Form.Item
        label="Prix"
        name="price"
        initialValue={values.price}
        rules={[{ required: true, message: 'Veuillez entré le prix de la chambre!' }]}
      >
        <Input 
          value={values.price} 
          name='price' 
          onChange={(e) => setValues({...values, name:e.target.value})}
        />
      </Form.Item>

      <Form.Item
        label="Capacité max"
        name="maxPersons"
        initialValue={values.maxPersons}
        rules={[{ required: false, message: 'Veuillez entré le nombre de personne!' }]}
      >
        <Input 
          value={values.maxPersons} 
          type='number' 
          name='maxPersons' 
          onChange={(e) => setValues({...values, name:e.target.value})}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {!addRoom ? 
          <Button type="danger" style={{ marginLeft : '1rem' }} onClick={handleDelete}>
              Supprimer
          </Button>
          :
          null
        }
      </Form.Item>
    </Form>
  );
};