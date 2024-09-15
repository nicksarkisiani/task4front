import React, {FC, useContext, useEffect} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const App: FC = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) store.verify(token)
    }, [])

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div>
            <h1>{store.isAuth ? `Пользователь авторизован` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
        </div>
    );
};

export default observer(App);