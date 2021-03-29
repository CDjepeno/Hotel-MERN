import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox } from 'antd';
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
    id: string,
    room: { 
        _id: string,
        name: string,
        maxPersons: number
    }
    setRoom: any
}

type FormType = { 
  name: any,
  maxPersons: any
}

export const FormRoom: React.FC<Props>= ({id, room, setRoom}) => {
  const [values, setValues] = useState<FormType|null>(null)

  useEffect(() => {
    setValues(room)
    console.log(values);
    
  },[room,id])

  const onFinish = (values: any) => {
    RoomService.upddateRoom(values,id)
    .then(response => console.log(response))
    .then(setRoom(values))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const history = useHistory()
  
  const handleDelete = () => {
    RoomService.deleteRoom(id)
    history.replace('/')
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
        <Button type="danger" style={{ marginLeft : '1rem' }} onClick={handleDelete}>
            Supprimer
        </Button>
      </Form.Item>
    </Form>
  );
};