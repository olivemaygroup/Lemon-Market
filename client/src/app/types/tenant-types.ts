export interface Tenant {
  tenant_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface NewUser {
  email: string;
  fistName: string;
  lastName: string;
  password: string;
}

export interface LogIn {
  username: string;
  password: string;
}