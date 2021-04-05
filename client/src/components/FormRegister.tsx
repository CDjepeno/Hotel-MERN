import React, { useState } from 'react';
import { Form, Input } from 'antd';
import Button from "antd-button-color";
import { useHistory } from 'react-router';
import AuthenticationService from '../services/authAPI';


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

type Field = {
    value?: any,
    error?: string,
};

type FormType = { 
  email: Field,
  password: Field,
}

export const FormRegister: React.FC= () => {
  const [form, setForm] = useState<FormType>({
      email: {value: ""},
      password: {value: ""}
  })

  const history = useHistory()
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }


  const onFinish = (values: any) => {
    AuthenticationService.register(values)
    history.replace('/')
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
            label="Votre nom"
            name="name"
            rules={[{ required: true, message: 'Veuillez entré votre nom !' }]}
        >
            <Input
                name='name' 
                onChange={handleChange}
            />
        </Form.Item>
    

        <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Veuillez entré le nom de la chambre!' }]}
        >
            <Input
                name='email' 
                onChange={handleChange}
            />
      </Form.Item>

      <Form.Item
        label="Mot de passe"
        name="password"
        rules={[{ required: true, message: 'Veuillez entré le mot de passe !' }]}
      >
        <Input.Password 
            name='password' 
            onChange={handleChange}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Connexion
        </Button>
      </Form.Item>
    </Form>
  );
};