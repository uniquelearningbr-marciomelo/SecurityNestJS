import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cliente" })
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "nome", nullable: true})
    nome: string;

    @Column({name: "telefone", nullable: false, unique: true})   
    telefone: string;
}
