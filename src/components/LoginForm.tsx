import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Button, Form, Input} from "antd";
import Title from "antd/lib/typography/Title";

type FieldType = {
    email: string;
    password: string;
};

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <>
            <Title>Login</Title>
            <Form
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={() => store.login(email, password)}
                autoComplete="off"
            >
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

export default observer(LoginForm);