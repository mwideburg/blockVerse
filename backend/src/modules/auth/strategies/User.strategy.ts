
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../../users/Users.service';

import { User } from '../../users/User';
import { AuthenticationService } from '../Authentication.service';



 
@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, "user") {
  constructor(
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
 
  public async validate(payload: TokenPayload, params: CreateWorldRequestParams): Promise<User> {

    const user = await this.authenticationService.validateUserParams(payload.userId, params.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}