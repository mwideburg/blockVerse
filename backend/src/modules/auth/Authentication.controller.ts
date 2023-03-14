import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, Request, Logger } from '@nestjs/common';
import { AuthenticationService } from './Authentication.service';


import { LocalAuthenticationGuard } from './guards/LocalAuthentication.guard';
import { RegisterRequestDto } from './dto/request/Register.request.dto';
import RequestWithUser from './interfaces/RequestWithUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/JwtAuthentication.guard';

 
@Controller('')
export class AuthenticationController {
    private readonly logger = new Logger(AuthenticationController.name);
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}
 
  @Post('register')
  async register(@Body() registrationData: RegisterRequestDto) {
    return this.authenticationService.register(registrationData);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Request() request: RequestWithUser, @Res() response: Response) {
    const {user} = request;

    const {cookie, token} = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;

    this.logger.log("successfull login", user)
    return response.send({...user, accessToken: token});
  }

//   @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const {user} = request;
    user.password = undefined;
    return user;
  }
}