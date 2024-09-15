
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import $api from "../http";

export default class AuthService {
    static async login(email: string, password: string) : Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {email, password});
    }

    static async registration(name: string, email: string, password: string) : Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', {name, email, password});
    }

    static async verify(token: string) : Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/verify', {token});
    }
}