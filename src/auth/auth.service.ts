import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: RegisterDto): Promise<User> {
    const { username, email, password } = { ...registerData };
    const user = await this.prisma.user.findUnique({
      where: { username, OR: [{ email }] },
    });
    if (!user) {
      return await this.prisma.user.create({
        data: {
          username,
          email,
          password: await bcrypt.hash(password, 10),
        },
      });
    }
    throw new ConflictException(
      'Пользователь с таким логином или почтой уже существует',
    );
  }

  async login(loginData: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = { ...loginData };
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user) {
      if (!bcrypt.compare(password, user.password)) {
        throw new BadRequestException('Неверный пароль');
      }
      const payload = { sub: user.id, username: user.username };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
    throw new NotFoundException('Пользователя с таким логином не существует');
  }
}
