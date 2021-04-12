import React, { useState } from 'react';
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

type Field = {
    value?: any,
    error?: string,
};


type FormType = { 
  name: Field,
  price: Field,
  maxPersons: Field,
  image: Field
}

export const FormAddRoom: React.FC= () => {
  const [form, setForm] = useState<FormType>({
      name: { value: "" },
      price: { value: "" },
      maxPersons: { value: "" },
      image: { value: "" }
  })
  const history = useHistory()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }


  const onFinish = async (values: any) => {    

    try {
      await RoomService.addRoom(values)
      .then(response => console.log(response))
      history.replace('/rooms')
    } catch (error) {
      console.error(error);
      
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
        rules={[{ required: true, message: 'Veuillez entré le nom de la chambre!' }]}
      >
        <Input 
          name='name' 
          onChange={ handleChange }
        />
      </Form.Item>

      <Form.Item
        label="Prix"
        name="price"
        rules={[{ required: true, message: 'Veuillez entré le prix de la chambre!' }]}
      >
        <Input 
          type='number' 
          name='price' 
          onChange={ handleChange }
        />
      </Form.Item>

      <Form.Item
        label="Capacité max"
        name="maxPersons"
        rules={[{ required: false, message: 'Veuillez entré le nombre de personne!' }]}
      >
        <Input 
          type='number' 
          name='maxPersons' 
          onChange={ handleChange }
        />
      </Form.Item>

      <Form.Item
        label="photo"
        name="image"
        rules={[{ required: false, message: 'Veuillez upload une image!' }]}
      >
        <Input 
          type='text' 
          name='image' 
          // onChange={ handleChange }
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};