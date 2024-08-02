import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsermanagmentDto } from './dto/create-usermanagment.dto';
import { UpdateUsermanagmentDto } from './dto/update-usermanagment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usermanagment } from './entities/usermanagment.entity';
import { Repository } from 'typeorm';
// import { promises } from 'dns';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsermanagmentService {
  constructor(
    @InjectRepository(Usermanagment)
    private userRepository: Repository<Usermanagment>,
  ) {}
  async create(createUsermanagmentDto: CreateUsermanagmentDto) {
    let user = this.userRepository.create(createUsermanagmentDto);
    user.password = (await this.hashPassword(user.password)).toString();
    const tokenLength = 50;
    user.token= this.generateAlphabeticToken(tokenLength);

    // console.log((await this.hashPassword(user.password)).toString());
    return this.userRepository.save(user);
    // return 'This action adds a new usermanagment';
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
    //return `This action returns all usermanagment`;
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
    //return `This action returns a #${id} usermanagment`;
  }

  async update(
    id: number,
    updateUsermanagmentDto: UpdateUsermanagmentDto,
  ): Promise<Usermanagment> {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUsermanagmentDto,
    });
    if (!user) {
      throw new NotFoundException('user#$(id) not found');
    }
    return await this.userRepository.save(user);
    //return `This action updates a #${id} usermanagment`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
    //return `This action removes a #${id} usermanagment`;
  }
}
