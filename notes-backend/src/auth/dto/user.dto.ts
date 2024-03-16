import { UUID } from 'crypto';

export class UserDto {
  id: UUID;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}
