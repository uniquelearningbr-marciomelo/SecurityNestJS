import { Length } from "class-validator";

export class UpdateClienteDto {
    
    readonly id: string;
    readonly nome: string;
    @Length(5, 15, {message: "Telefone deve ter entre 5 e 15 caracteres"})
    readonly telefone: string;
}
