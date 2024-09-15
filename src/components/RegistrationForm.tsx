import React, {useContext, useState} from "react";
import {Context} from "../index";

const RegistrationForm = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder='name'
            />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Password'
            />
            <button onClick={() => store.registration(name, email, password)}>
                Register
            </button>
        </div>
    );

};

export default RegistrationForm;