import { User } from "../users/User"
import WorldObject from "../worldObjects/WorldObject"

export default class World {
    id: number
    name: string
    width: number
    length: number
    creator: User
    createdBy: number
}