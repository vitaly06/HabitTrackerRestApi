import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registerUser(@Body() registerData: RegisterDto): Promise<User> {
    return this.authService.register(registerData);
  }

  @Post('login')
  async loginUser(
    @Body() loginData: LoginDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginData);
  }
}
