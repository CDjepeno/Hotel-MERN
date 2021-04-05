import React, { useContext, useState } from 'react';
import { Form, Input } from 'antd';
import Button from "antd-button-color";
import { useHistory } from 'react-router';
import AuthenticationService from '../services/authAPI';
import AuthContext from '../context/AuthContext';


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

export const FormLogin: React.FC= () => {
  const [form, setForm] = useState<FormType>({
      email: {value: ""},
      password: {value: ""}
  })

  const { setIsAuthenticatedUser } = useContext(AuthContext)
  const { isAuthenticatedManager, setIsAuthenticatedManager} = useContext(AuthContext);

  const history = useHistory()
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }


  const onFinish = (values: any) => {
    AuthenticationService.login(values)
    setIsAuthenticatedUser(true)
    if(isAuthenticatedManager) {
      setIsAuthenticatedManager(true)
    }
    history.replace('/rooms')
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