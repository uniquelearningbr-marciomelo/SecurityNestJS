import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "username", nullable: true})
    username: string;

    @Column({name: "password", nullable: false, unique: true})
    password: string;
}