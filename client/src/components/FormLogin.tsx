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
  const [message, setMessage] = useState<string>()

  const { setIsAuthenticatedUser } = useContext(AuthContext)
  const { isAuthenticatedManager, setIsAuthenticatedManager} = useContext(AuthContext);


  const history = useHistory()
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }


  const onFinish = async (values: any) => {
	  
    try {
      await AuthenticationService.login(values)

      setIsAuthenticatedUser(true)
      
      const isAuthenticatedM = await AuthenticationService.isAuthenticatedManager 

      setIsAuthenticatedManager(isAuthenticatedM)          
        
      history.replace('/rooms')
      
    } catch (err) {
		
        console.log(err.response.data.message)
		setMessage(err.response.data.message)
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
       {/* Form message */}
       {message && 
			<div className="form-group">
				<div className="card-panel #e71919 lighten-5">
					{message}
				</div>
			</div>
        }
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: 'Veuillez entré l\'email!' }]}
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