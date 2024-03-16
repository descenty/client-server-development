import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UserService, AuthService],
  imports: [CacheModule.register()],
})
export class UserModule {}
