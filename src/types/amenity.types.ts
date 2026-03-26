export interface ICreateAmenity {
  title: string;
  icon?: string;
  serialNumber: number;
}

export interface IUpdateAmenity {
  title?: string;
  icon?: string;
  serialNumber?: number;
}

export interface IAmenity {
  id: string;
  title: string;
  icon?: string;
  serialNumber: number;
  createdAt?: string;
  updatedAt?: string;
}