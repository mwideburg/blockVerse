import World from "../World"

export const WORLD_SERVICE = "WORLD_SERVICE"
export interface IWorldService {
    createWorld(world: Omit<World, "id">): Promise<World>
    getWorldById(id: number): Promise<World>
    getUserWorlds(id: number): Promise<World[]>
}