export interface ICreateBedType {
  name: string;
}

export interface IUpdateBedType {
  name?: string;
}

export interface IBedType {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}   