import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as memoize from 'memoizee';
import * as jwt from 'jsonwebtoken';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) return false;
    return this.getPublicKeyMemo().then((publicKey) => {
      try {
        const payload = jwt.verify(token, publicKey, {
          algorithms: ['RS256'],
          audience: 'account',
        }) as jwt.JwtPayload;
        const user = {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          roles: payload.roles,
        } as UserDto;
        request['user'] = user;
        return true;
      } catch (e) {
        return false;
      }
    });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getPublicKeyMemo = memoize(getPublicKey, { async: true });
}

const getPublicKey = async () =>
  `-----BEGIN PUBLIC KEY-----\n${
    (
      await (
        await fetch(
          `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
        )
      ).json()
    ).public_key
  }\n-----END PUBLIC KEY-----`;
