import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('add-client')
  create(@Body() createClientDto: CreateClientDto) {
    console.log("hello controler");
    return this.clientService.create(createClientDto);
  }

  @Get('list-client')
  findAll() {
    return this.clientService.findAll();
  }

  @Get('client/:id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(+id);
  }

  @Patch('update-client/:id')
  update(@Param('id') id: number, 
  @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete('update/:id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(+id);
  }
}
