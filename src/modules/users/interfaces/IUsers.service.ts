import { User } from "../User.entity";
export const USERS_SERVICE = "USERS_SERVICE"
export interface IUserService {
    createUser(user: Omit<User, "id">): Promise<User>
    getUser(id: number): Promise<User>
    getUsers(): Promise<[User]>
}