export enum Role {
  CUSTOMER,
  ADMIN
}

export enum UserStatus { 
  ACTIVE,
  BLOCKED,
  DELETED
}
export interface ICreateCustomerPayload {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  profilePhoto: string;
  role: Role;
  userStatus: UserStatus;
  isDeleted: boolean
}

export interface IUpdateCustomerPayload {
  admin?: {
    name?: string;
    profilePhoto?: string;
    contactNumber?: string;
  };
}

export interface IChangeCustomerStatusPayload {
  userId: string;
  userStatus: UserStatus;
}

export interface IChangeCustomerRolePayload {
  userId: string;
  role: Role;
}

export interface ICustomer {
    id: string;
    name: string;
    email: string;
    contactNumber: string;
    profilePhoto: string;
    role: Role;
    status: UserStatus;
    isDeleted: boolean
    createdAt: string;
    updatedAt: string;
}