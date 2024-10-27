import { IsNotEmpty, Length } from "class-validator";

export class CreateClienteDto {
    
    readonly id?: string;
    @IsNotEmpty({message: "Nome é obrigatório"})
    readonly nome: string;
    @Length(5, 15, {message: "Telefone deve ter entre 5 e 15 caracteres"})
    @IsNotEmpty({message: "Telefone é obrigatório"})
    readonly telefone: string;
}
