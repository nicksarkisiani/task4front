import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./services/UserService";
import {IUser} from "./models/IUser";
import RegistrationForm from "./components/RegistrationForm";

const App: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    console.log(users)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) store.verify(token)
    }, [store])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response);
        } catch (e) {
            console.log(e);
        }
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
                <RegistrationForm />
            </div>
        );
    } else {
        getUsers()
    }

    return (
        <div>
            <button onClick={() => store.logout()}>Logout</button>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    );
};

export default observer(App);
