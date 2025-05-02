import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHabbitDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  descrtiption: string;
  @IsString()
  @IsNotEmpty()
  frequency: string;
  @IsNumber()
  target: number;
}

export class AddHabitLog {
  date: Date;
  @IsNotEmpty()
  value: number;
}
