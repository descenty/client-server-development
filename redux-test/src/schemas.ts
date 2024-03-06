import { User } from "oidc-client-ts";

export interface AppUser extends User {
  roles: string[];
}
