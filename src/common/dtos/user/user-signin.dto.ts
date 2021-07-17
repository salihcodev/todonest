import { IsNotEmpty } from 'class-validator';

export class UserSigninDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
