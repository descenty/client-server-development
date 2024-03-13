import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import memoize from 'memoizee';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    const publicKey = this.getPublicKey();
    try {
      const payload = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
        audience: 'account',
      });
      request['user'] = payload;
    } catch {
      // could not validate credentials
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getPublicKey = memoize(
    async () =>
      /*
        async with AsyncClient() as client:
        response: Response = await client.get(
            f"{settings.keycloak.url}/realms/{settings.keycloak.realm}"
        )
        if response.status_code == 200:
            return f"-----BEGIN PUBLIC KEY-----\n{response.json()["public_key"]}\n-----END PUBLIC KEY-----"
    raise Exception("Could not get public key from Keycloak")*/
      (
        await (
          await fetch(
            `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
          )
        ).json()
      ).public_key,
  );
}
