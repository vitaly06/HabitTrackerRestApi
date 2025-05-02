import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [AuthModule, HabitsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
