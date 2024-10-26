import { isDate, IsDateString, IsString, Length, MaxLength } from "class-validator";

export class CreateEventDto {
  @IsString()
  @Length(5, 50)
  name: string;

  @IsString()
  @Length(5, 300)
  description: string;

  @IsString()
  @MaxLength(100)
  location: string;
}