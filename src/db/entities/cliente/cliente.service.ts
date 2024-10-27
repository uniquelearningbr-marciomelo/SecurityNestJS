import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create.cliente.dto';
import { UpdateClienteDto } from './dto/update.cliente.dto';

@Injectable()
export class ClienteService {
    constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>) { }

    async createUser(clienteDTO: CreateClienteDto): Promise<CreateClienteDto> {
        const cliente = this.clienteRepository.save(clienteDTO);
        return cliente;
    }
    
    updateUser(updateClienteDto: UpdateClienteDto) {
        let clientIndex = this.clienteRepository.find({ where: {id: updateClienteDto.id}});
    }

    findById(id: string): Cliente[] | PromiseLike<Cliente[]> {
        const found = this.clienteRepository.find({ where: {id: id}}).then((found) => found);
        if(found){
            return found[0];
        }
        throw new HttpException(`Cliente de ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    async findAll(): Promise<Cliente[]> {
        return this.clienteRepository.find();
    }
}
