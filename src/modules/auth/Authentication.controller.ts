import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthenticationService } from './Authentication.service';


import { LocalAuthenticationGuard } from './guards/LocalAuthentication.guard';
import { RegisterRequestDto } from './dto/request/Register.request.dto';
import RequestWithUser from './interfaces/RequestWitgUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/JwtAuthentication.guard';
 
@Controller('')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}
 
  @Post('register')
  async register(@Body() registrationData: RegisterRequestDto) {
    return this.authenticationService.register(registrationData);
  }
 
  @HttpCode(200)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const {user} = request.body;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}