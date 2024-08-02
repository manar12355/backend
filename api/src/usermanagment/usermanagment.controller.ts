import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';

import { UsermanagmentService } from './usermanagment.service';
import { CreateUsermanagmentDto } from './dto/create-usermanagment.dto';
import { UpdateUsermanagmentDto } from './dto/update-usermanagment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles';
@Controller('usermanagment')
export class UsermanagmentController {
  constructor(private readonly usermanagmentService: UsermanagmentService) {}
  //@UseGuards(AuthGuard)
  // @Roles('admin', 'user', 'writer')
  @Post('add-user')
  create(@Body() createUsermanagmentDto: CreateUsermanagmentDto) {
    console.log(' hello controller');
    return this.usermanagmentService.create(createUsermanagmentDto);
  }
  @Post('login-user') //router
  loginUser(@Body('email') email: string, @Body('password') password: string) {
    console.log('email', email);
    return this.usermanagmentService.login(email, password);
  }

  @Get('list-user')
  findAll() {
    return this.usermanagmentService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: number) {
    return this.usermanagmentService.findOne(+id);
  }

  @Patch('update-user/:id')
  update(
    @Param('id') id: Number,
    @Body() updateUsermanagmentDto: UpdateUsermanagmentDto,
  ) {
    return this.usermanagmentService.update(+id, updateUsermanagmentDto);
  }

  @Delete('update/:id')
  remove(@Param('id') id: number) {
    return this.usermanagmentService.remove(+id);
  }
}
