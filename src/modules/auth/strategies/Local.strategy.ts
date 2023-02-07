

import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../Authentication.service';
import { User } from '../../users/User';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';


 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email'
    });
  }
  async validate(email: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}