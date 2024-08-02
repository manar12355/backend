import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { client } from './entities/client.entity';
import { Repository } from 'typeorm';
// import { promises } from 'dns';
import * as bcrypt from 'bcrypt';
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(client)
    private userRepository: Repository<client>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    let user = this.userRepository.create(createClientDto);
    user.password = (await this.hashPassword(user.password)).toString();
    const tokenLength = 50;
    user.token= this.generateAlphabeticToken(tokenLength);

    // console.log((await this.hashPassword(user.password)).toString());
    return this.userRepository.save(user);
    // return 'This action adds a new Client';
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
  generateAlphabeticToken(length:number){
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@&$';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        token += alphabet[randomIndex];
    }
    return token; 
}
async findUserByemail(email:string){
  let  user= await this.userRepository.findOne({where:{email:email}})
  return user
}
 async login(email:string,password:string){
  let  user= await this.userRepository.findOne({where:{email:email}})
  if (!user) {
    throw new Error('User not found');
  }
  else{
    const isPasswordValid = await bcrypt.compare(password, ((await user).password).toString());
     if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

  }
  return user
}


  findAll() {
    return this.userRepository.findAndCount();
    //return `This action returns all Client`;
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
    //return `This action returns a #${id} Client`;
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<client> {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateClientDto,
    });
    if (!user) {
      throw new NotFoundException('user#$(id) not found');
    }
    return await this.userRepository.save(user);
    //return `This action updates a #${id} Client`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
    //return `This action removes a #${id} Client`;
  }
}
