import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox } from 'antd';
import Button from "antd-button-color";


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
}

type FormType = { 
  name: any,
  maxPersons: any
}

export const FormRoom: React.FC<Props>= ({id, room}) => {
  const [values, setValues] = useState<FormType|null>(null)

  useEffect(() => {
    setValues(room)
    console.log(values);
    
  },[room,id])

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
        <Button type="danger" style={{ marginLeft : '1rem' }}>
            Supprimer
        </Button>
      </Form.Item>
    </Form>
  );
};