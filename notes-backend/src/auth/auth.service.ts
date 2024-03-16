import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { URLSearchParams } from 'url';

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
}
