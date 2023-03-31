import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/domains/user';
import { hashPassword, validatePassword } from '@/lib/helpers/crypto.helper';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '@/auth/requests/sign-up.dto';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne({
      where: { username: username },
    });
    if (!user || !(await validatePassword(pass, user.passwordHash)))
      throw new UnauthorizedException();

    const payload = { username: user.username, sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(req: CrudRequest, user: SignUpDto) {
    const { password, ...usr } = user;
    const passwordHash = await hashPassword(password);
    return await this.usersService.createOne(req, {
      ...usr,
      passwordHash,
    });
  }
}
