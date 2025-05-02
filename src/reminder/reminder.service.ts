import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReminderService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsGateway,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async checkReminders() {
    const habits = await this.prisma.habit.findMany({
      where: { frequency: 'daily' },
    });
    const today = new Date().toISOString().split('T')[0];
    for (const habit of habits) {
      const log = await this.prisma.habitLog.findFirst({
        where: {
          habitId: habit.id,
          date: { gte: new Date(today) },
        },
      });
      if (!log) {
        this.notifications.sendReminder(
          habit.userId,
          habit.id,
          `Time to ${habit.title}!`,
        );
      }
    }
  }
}
