import { IsNumber, Max, Min } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToOne } from "typeorm"
import { UserEntity } from "./User.entity"
import { WorldObjectEntity } from "./WorldObject.entity"
@Entity("worlds")
export class WorldEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    @IsNumber()
    @Max(1000000)
    @Min(100)
    width: number

    @Column()
    @IsNumber()
    @Max(1000000)
    @Min(100)
    length: number

    @Column()
    createdBy: number

    @ManyToOne(() => UserEntity, (user) => user.worlds)
    creator: UserEntity

    @OneToMany(() => WorldObjectEntity, (worldObject) => worldObject.world)
    worldObjects: WorldObjectEntity[]
}