import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { ReminderService } from 'src/reminder/reminder.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NotificationsGateway, ReminderService, PrismaService],
})
export class NotificationsModule {}
