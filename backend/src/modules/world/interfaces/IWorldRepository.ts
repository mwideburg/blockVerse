import World from "../World"

export const WORLD_REPOSITORY = "WORLD_REPOSITORY"
export interface IWorldRepository {
    createWorld(world: Omit<World, "id">): Promise<World>
    getWorldById(id: number): Promise<World>
    getUserWorlds(id: number): Promise<World[]>
}