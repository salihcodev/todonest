import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';
import { JwtPayload } from '../interfaces/auth/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user/user.repository';
import { User } from '../entities/user/user.entity';

// get secret from env configuration:
const { secret } = config.get('jwt');

export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    const user = this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(
        'Unauthorized, You must provide valid credential!',
      );
    }

    return user;
  }
}
