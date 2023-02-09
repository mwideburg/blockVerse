

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../Authentication.service';
import { User } from '../../users/User';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';


 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authenticationService: AuthenticationService) {
      super({ usernameField: 'userName' })
  }
  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authenticationService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}