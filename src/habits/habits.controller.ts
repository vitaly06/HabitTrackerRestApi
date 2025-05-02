import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { AddHabitLog, CreateHabbitDto } from './habit.dto';

@Controller('habits')
@UseGuards(AuthGuard('jwt'))
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post('createHabit')
  async createHabit(@GetUser() user: any, @Body() data: CreateHabbitDto) {
    return this.habitsService.createHabbit(user.id, data);
  }

  @Get('all')
  async getHabits(@GetUser() user: any) {
    return this.habitsService.getHabits(user.id);
  }

  @Put(':id')
  async updateHabit(@Param('id') id: string, @Body() data: CreateHabbitDto) {
    return this.habitsService.updateHabit(Number(id), data);
  }

  @Delete(':id')
  async deleteHabit(@Param('id') id: string) {
    return this.habitsService.deleteHabit(Number(id));
  }

  @Post(':id/log')
  async logHabit(
    @GetUser() user: any,
    @Param('id') id: string,
    @Body() data: AddHabitLog,
  ) {
    return this.habitsService.logHabit(user.id, Number(id), data);
  }

  @Get(':id/stats')
  async getHabitsStats(
    @GetUser() user: any,
    @Param('id') id: string,
    @Query('period') period: string,
  ) {
    return this.habitsService.getHabitStats(user.id, parseInt(id), period);
  }
}
