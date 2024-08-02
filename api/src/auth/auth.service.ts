import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsermanagmentService } from 'src/usermanagment/usermanagment.service';
import * as bcrypt from 'bcrypt';
import { UserLogin } from './userLogin';
import { ClientModule } from 'src/client/client.module';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usermanagmentService: UsermanagmentService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usermanagmentService.findUserByemail(email);
    console.log('user service', user);

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        pass,
        (await user).password.toString(),
      );
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      return user;
    }
    return null;
  }
  async login(userLogin: UserLogin) {
    const objectUser = await this.validateUser(
      userLogin.email,
      userLogin.password,
    );
    console.log(' objectt user', objectUser);
    if (objectUser) {
      const idUserIoc = await objectUser;
      const payload = {
        user: objectUser,
        role: objectUser.role,
        id: idUserIoc.id,
      };
      const role = payload.role;
      return {
        idUserIoc,
        access_token: this.jwtService.sign(payload),
        role,
      };
    } else {
      return 'email et/ou mot de passe incorrect';
    }
  }
}
