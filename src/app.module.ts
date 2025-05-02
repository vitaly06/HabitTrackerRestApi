import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { HabitsModule } from './habits/habits.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReminderService } from './reminder/reminder.service';

@Module({
  imports: [AuthModule, HabitsModule, NotificationsModule],
  controllers: [],
  providers: [PrismaService, ReminderService],
})
export class AppModule {}
