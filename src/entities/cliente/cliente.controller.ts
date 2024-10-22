import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create.cliente.dto';
import { UpdateClienteDto } from './dto/update.cliente.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cliente')
export class ClienteController {

    constructor(private readonly clienteService: ClienteService) { }

    @Get()
    async findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<Cliente[]> {
        return this.clienteService.findById(id);
    }

    @Post()
    async create(@Body() createClienteDto: CreateClienteDto): Promise<CreateClienteDto> {
        const cliente = await this.clienteService.createUser(createClienteDto);

        return cliente;
    }

    @Put()
    async update(@Body() updateClienteDto: UpdateClienteDto) {
        await this.clienteService.updateUser(updateClienteDto);
    }
}
