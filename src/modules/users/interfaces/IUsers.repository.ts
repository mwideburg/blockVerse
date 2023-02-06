import { User } from "../User.entity";
export const USERS_REPOSITORY = "USERS_REPOSITORY"
export interface IUserRepository {
    createUser(user: Omit<User, "id">): Promise<User>
    getUser(id: number): Promise<User>
    getUsers(): Promise<[User]>
}