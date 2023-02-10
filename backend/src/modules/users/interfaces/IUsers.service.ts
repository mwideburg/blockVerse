import { User } from "../User";
export const USERS_SERVICE = "USERS_SERVICE"
export interface IUserService {
    createUser(user: Omit<User, "id">): Promise<User>
    getUser(id: number): Promise<User>
    getByUsername(userName: string): Promise<User>
    getUsers(): Promise<[User]>
}