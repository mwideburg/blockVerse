import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
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

}
