import WorldObject from "../WorldObject"
export const WORLD_OBJECT_REPOSITORY = "WORLD_OBJECT_REPOSITORY"
export interface IWorldObjectRepository {
    create(world: Omit<WorldObject, "id">): Promise<WorldObject>
    get(id: number): Promise<WorldObject>
}