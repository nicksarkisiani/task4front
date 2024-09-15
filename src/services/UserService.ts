import $api from "../http";
import {IUser} from "../models/IUser";

interface IUserArray {
    users: IUser[]
}

export default class UserService {
    static async fetchUsers(): Promise<IUser[]> {
        const {data} = await $api.get<IUserArray>('/user/users')
        return data.users;
    }
}