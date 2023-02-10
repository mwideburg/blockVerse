import { IsNumber, Max, Min } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToOne } from "typeorm"
import { UserEntity } from "./User.entity"
import { WorldEntity } from "./World.entity"
@Entity("worldObjects")
export class WorldObjectEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    x: number

    @Column()
    y: number

    @Column()
    z: number

    @ManyToOne(() => WorldEntity, (world) => world.worldObjects)
    world: UserEntity
   
}