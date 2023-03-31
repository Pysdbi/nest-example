import { Body, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/auth/auth.service';
import { SignUpDto } from '@/auth/requests/sign-up.dto';
import {
  Crud,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@nestjsx/crud';
import { User } from '@/domains/user';
import { LoginDto } from '@/auth/requests/login.dto';
import { Public } from '@/auth/decorators/public.decorator';

@Crud({
  model: { type: User },
  routes: {
    // @ts-ignore
    only: ['register'],
  },
})
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @UseInterceptors(CrudRequestInterceptor)
  async signUp(@ParsedRequest() req: CrudRequest, @Body() payload: SignUpDto) {
    return this.authService.signUp(req, payload);
  }

  @Public()
  @UseInterceptors(CrudRequestInterceptor)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.username, loginDto.password);
  }
}
