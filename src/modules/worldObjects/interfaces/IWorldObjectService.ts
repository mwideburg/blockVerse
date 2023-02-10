
import WorldObject from "../WorldObject"

export const WORLD_OBJECT_SERVICE = "WORLD_OBJECT_SERVICE"
export interface IWorldObjectService {
    create(world: Omit<WorldObject, "id">): Promise<WorldObject>
    get(id: number): Promise<WorldObject>
}