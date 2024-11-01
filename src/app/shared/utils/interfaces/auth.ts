import { Role } from "./warehouse-assistant";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface TokenInterface {
  token: string;
}

export interface ClientRequest {
  name: string;
  lastName: string;
  document: string;
  phone: string;
  birthdate: string | Date;
  email: string;
  password: string;
}

export interface ClientResponse extends ClientRequest {
  userId: string;
  role: Role;
}