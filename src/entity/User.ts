import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import {IsEmail} from "class-validator"
@Entity()
export class User {

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
