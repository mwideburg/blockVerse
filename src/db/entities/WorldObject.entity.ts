import { IsNumber, Max, Min } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { UserEntity } from "./User.entity"
import { WorldEntity } from "./World.entity"
@Entity("worldObjects")
export class WorldObjectEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    objectType: number

    @Column()
    x: number

    @Column()
    y: number

    @Column()
    z: number

    @Column({nullable: true})
    width?: number

    @Column({nullable: true})
    depth?: number

    @Column({nullable: true})
    height?: number

    @Column()
    worldId: number

    @ManyToOne(() => WorldEntity, (world) => world.worldObjects)
    world: UserEntity
   
}