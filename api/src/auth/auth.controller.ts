import { Body, Controller, Post } from '@nestjs/common';
import { UserLogin } from './userLogin';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService ,
   ) {}
  @Post('login-auth')
  signIn(@Body() userLogin:UserLogin) {
    console.log("user",userLogin)
    return this.authService.login(userLogin);
  }
}
