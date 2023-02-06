import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import {IsEmail} from "class-validator"
@Entity("user")
@Unique(["email"])
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    @IsEmail()
    email: string

    @Column()
    password: string

}
