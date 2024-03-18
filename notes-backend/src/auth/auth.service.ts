import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { URLSearchParams } from 'url';
import * as memoize from 'memoizee';
import { UserDto } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async signIn() {}
  async signUp() {}

  async clientAuth(): Promise<string> {
    return (
      await axios.post(
        `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.KEYCLOAK_CLIENT_ID,
          client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        }),
      )
    ).data.access_token;
  }

  async checkRequestAuthentication(request: Request) {
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
          roles: payload.realm_access.roles,
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

  private getPublicKeyMemo = memoize(this.getPublicKey, { async: true });

  private async getPublicKey() {
    return `-----BEGIN PUBLIC KEY-----\n${
      (
        await (
          await fetch(
            `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
          )
        ).json()
      ).public_key
    }\n-----END PUBLIC KEY-----`;
  }
}
