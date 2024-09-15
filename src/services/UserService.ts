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

    static async deleteMany(idsArray: string[]): Promise<IUser[]> {
        return await $api.post('/user/deleteMany', idsArray);
    }

    static async blockMany(idsArray: string[]): Promise<IUser[]> {
        return await $api.post('/user/blockMany', idsArray);
    }

    static async unblockMany(idsArray: string[]): Promise<IUser[]> {
        return await $api.post('/user/unblockMany', idsArray);
    }
}