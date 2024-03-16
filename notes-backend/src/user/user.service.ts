import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { UUID } from 'node:crypto';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly authService: AuthService,
  ) {}
  async getById(id: UUID): Promise<UserDto> {
    const cachedUser = await this.cacheManager.get(id);
    if (cachedUser) {
      return cachedUser as UserDto;
    }
    const user = (
      await axios.get(
        `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${await this.authService.clientAuth()}`,
          },
        },
      )
    ).data;
    await this.cacheManager.set(id, user, 0);
    return user;
  }
}
