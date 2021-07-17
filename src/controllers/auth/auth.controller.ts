import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserSigninDto } from 'src/common/dtos/user/user-signin.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { UserSignupDto } from 'src/common/dtos/user/user-signup.dto';

@Controller('api/auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() userSignupDto: UserSignupDto): Promise<void> {
    return this.authService.signup(userSignupDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signin(
    @Body() userSigninDto: UserSigninDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(userSigninDto);
  }
}
