import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./services/UserService";
import {IUser} from "./models/IUser";
import RegistrationForm from "./components/RegistrationForm";


const App: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleCheckboxChange = (userId: string) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    const deleteHandler = async () => {
        await UserService.deleteMany(selectedUsers)
        const token = localStorage.getItem('token');
        console.log(token, localStorage)
        if (token) {

            await store.verify(token);
            await getUsers();
        }
    }

    const blockHandler = async () => {
        await UserService.blockMany(selectedUsers)
        const token = localStorage.getItem('token');
        if (token) {
            await store.verify(token);
            await getUsers();
        }
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
    }, [verify]);

    const testUsers = ["1","2", "3"]


    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
                <RegistrationForm />
                <div>
                    <button onClick={blockHandler}>block</button>
                    <button onClick={() => UserService.unblockMany(selectedUsers)}>Unblock</button>
                    <button onClick={deleteHandler}>delete</button>
                </div>
                {testUsers.map((user: string) => (
                    <div key={user}>
                        <input type={'checkbox'} checked={selectedUsers.includes(user)}
                               onChange={() => handleCheckboxChange(user)}/>
                        {user}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => store.logout()}>Logout</button>
            <div>
                <button onClick={blockHandler}>block</button>
                <button onClick={() => UserService.unblockMany(selectedUsers)}>Unblock</button>
                <button onClick={deleteHandler}>delete</button>
            </div>
            {users.map(user => (
                <div key={user._id}>
                    <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleCheckboxChange(user._id)}
                    />
                    User --- {user.name}
                </div>
            ))}
        </div>
    );
};

export default observer(App);
