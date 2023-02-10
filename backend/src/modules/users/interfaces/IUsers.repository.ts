import { User } from "../User";
export const USERS_REPOSITORY = "USERS_REPOSITORY"
export interface IUserRepository {
    createUser(user: Omit<User, "id">): Promise<User>
    getUser(id: number): Promise<User>
    getUsers(): Promise<[User]>
    getByUsername(userName: string): Promise<User>
    // logIn(password: string, id: number): Promise<User>
}