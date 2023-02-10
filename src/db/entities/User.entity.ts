import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"
import { WorldEntity } from "./World.entity"
@Entity("user")
@Unique(["userName"])
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    userName: string

    @Column()
    password: string

    @OneToMany(() => WorldEntity, (world) => world.creator)
    worlds: WorldEntity[]

}
