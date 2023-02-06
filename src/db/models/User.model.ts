import { Entity, PrimaryGeneratedColumn, Column, Unique, Index } from "typeorm"
import {IsEmail} from "class-validator"
@Entity("user")
@Unique(["email"])
export class UserModel {

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
