import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(value: boolean) {
        this.isAuth = value;
    }


    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(name: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(name, email, password);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            this.setAuth(false);
        } catch (e) {
            console.log(e);
        }
    }

    async verify(token: string) {
        try {
            await AuthService.verify(token);
            this.setAuth(true);
        } catch (e) {
            console.log(e);
        }
    }


}