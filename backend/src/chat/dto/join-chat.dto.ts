import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class JoinChatDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  room: string;
}