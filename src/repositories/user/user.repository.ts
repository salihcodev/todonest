import { unique_violation } from 'src/common/constants/psql/error-codes.constants';
import { User } from './../../common/entities/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserSigninDto } from 'src/common/dtos/user/user-signin.dto';
import { JwtPayload } from 'src/common/interfaces/auth/jwt-payload.interface';
import { UserSignupDto } from 'src/common/dtos/user/user-signup.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // HASHING UER PASSWORD:
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  // CREATE NEW USER:
  async signup(userSignupDto: UserSignupDto): Promise<void> {
    const { firstName, lastName, email, password } = userSignupDto;

    // instantiate new user formed by user entity:
    const user = new User();

    // generate user salt:
    user.salt = await bcrypt.genSalt();

    // fill other user info with pre-made data:
    user.name = `${firstName} ${lastName}`;
    user.email = email;
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      // check via psql error code:
      if (error.code === unique_violation) {
        throw new ConflictException(`[${email}] is already existed.`);
      } else {
        // return normal exception error 'in normal if error occurred, nestjs triggers this error exception.':
        throw new InternalServerErrorException();
      }
    }
  }

  async signin(userSigninDto: UserSigninDto): Promise<JwtPayload> {
    const { email, password } = userSigninDto;

    // check if the user is already existed:
    // if this attempted signin is successful gonna have the user obj
    // attemptedSignin === existed user
    const attemptedSignin = await this.findOne({ email });

    // check if the provided pass is correspond to the current user who trying to login:
    if (attemptedSignin && (await attemptedSignin.isPasswordValid(password))) {
      const { email, name } = attemptedSignin;

      return { email, name };
    } else {
      return null;
    }
  }
}
