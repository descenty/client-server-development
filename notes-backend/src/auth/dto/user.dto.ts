import { UUID } from 'crypto';

export class UserDto {
  id: UUID;
  name: string;
  email: string;
  roles: string[];
}
