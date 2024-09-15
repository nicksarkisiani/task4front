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

    const testUsers = ["1","2", "3"]
    console.log(selectedUsers)
    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
                <RegistrationForm />
                <div>
                    <button onClick={() => UserService.blockMany(selectedUsers)}>block</button>
                    <button onClick={() => UserService.unblockMany(selectedUsers)}>Unblock</button>
                    <button onClick={() => UserService.deleteMany(selectedUsers)}>delete</button>
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
    } else {
        getUsers()
    }

    return (
        <div>
            <button onClick={() => store.logout()}>Logout</button>
            <div>
                <button onClick={() => UserService.blockMany(selectedUsers)}>block</button>
                <button onClick={() => UserService.unblockMany(selectedUsers)}>Unblock</button>
                <button onClick={() => UserService.deleteMany(selectedUsers)}>delete</button>
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
