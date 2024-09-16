import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./services/UserService";
import {IUser} from "./models/IUser";
import RegistrationForm from "./components/RegistrationForm";
import UsersList from "./components/UsersList";


const App: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    const deleteHandler = async (selectedUsers: string[]) => {
        await UserService.deleteMany(selectedUsers)
        await verify()
    }

    const blockHandler = async (selectedUsers: string[]) => {
        await UserService.blockMany(selectedUsers)
        await verify()
    }

    const getUsers = useCallback(async () => {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const verify = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            await store.verify(token);
            await getUsers();
        }
    }, [store, getUsers]);

    useEffect(() => {
        verify();
    }, [verify, store.isAuth]);


    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
                <RegistrationForm />
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => store.logout()}>Logout</button>
            <UsersList deleteHandler={deleteHandler} blockHandler={blockHandler} users={users}/>
        </div>
    );
};


export default observer(App);
