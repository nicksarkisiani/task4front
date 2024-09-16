import React, {useContext, useState} from "react";
import {Context} from "../index";
import {Button, Form, Input} from "antd";

type FieldType = {
    username: string;
    email: string
    password: string;
};

const RegistrationForm = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <>
            <h1>Registration</h1>
        <Form
            name="registration"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={() => store.registration(name, email, password)}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onChange={e => setName(e.target.value)} value={name}/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Username"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input onChange={e => setEmail(e.target.value)} value={email}/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password onChange={e => setPassword(e.target.value)} value={password}/>
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
    );

};

export default RegistrationForm;