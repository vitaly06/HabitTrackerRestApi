import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddHabitLog, CreateHabbitDto } from './habit.dto';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async createHabbit(userId: number, data: CreateHabbitDto) {
    return this.prisma.habit.create({
      data: {
        userId,
        title: data.title,
        description: data.descrtiption,
        frequency: data.frequency,
        target: data.target,
      },
    });
  }

  async getHabits(userId: number) {
    return this.prisma.habit.findMany({
      where: { userId },
    });
  }

  async updateHabit(habitId: number, data: CreateHabbitDto) {
    return this.prisma.habit.update({
      where: { id: habitId },
      data,
    });
  }

  async deleteHabit(habitId: number) {
    return this.prisma.habit.delete({
      where: { id: habitId },
    });
  }

  async logHabit(userId: number, habitId: number, data: AddHabitLog) {
    return this.prisma.habitLog.create({
      data: {
        habitId,
        userId,
        date: new Date(data.date),
        value: data.value,
      },
    });
  }

  async getHabitStats(userId: number, habitId: number, period: string) {
    const startDate = new Date();
    if (period == 'week') {
      startDate.setDate(startDate.getDate() - 7);
    }
    const logs = await this.prisma.habitLog.findMany({
      where: {
        habitId,
        userId,
        date: { gte: startDate },
      },
    });
    return logs.map((log) => ({
      data: log.date,
      value: log.value,
    }));
  }
}
