import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user/user.repository';
import { UserSigninDto } from 'src/common/dtos/user/user-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/auth/jwt-payload.interface';
import { UserSignupDto } from 'src/common/dtos/user/user-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  async signup(userSignupDto: UserSignupDto): Promise<void> {
    return this.userRepository.signup(userSignupDto);
  }

  async signin(userSigninDto: UserSigninDto): Promise<{ accessToken: string }> {
    const userData = await this.userRepository.signin(userSigninDto);

    if (!userData) {
      throw new UnauthorizedException(
        'Unauthorized, You must provide valid credential!',
      );
    }

    // extract coming payload values after signin process:
    const jwtPayload: JwtPayload = { ...userData };

    // assign new token
    const token: string = this.jwtService.sign(jwtPayload);
    return { accessToken: token };
  }
}
