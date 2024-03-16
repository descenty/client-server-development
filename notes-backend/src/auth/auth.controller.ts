import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn() {
    return await this.authService.signIn();
  }

  @Post()
  async signUp() {
    return await this.authService.signUp();
  }
}
