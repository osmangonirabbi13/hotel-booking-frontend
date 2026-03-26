
export interface ICreateRoomCategory {
  name: string;
  isActive?: boolean;
}

export interface IUpdateRoomCategory {
  name?: string;
  isActive?: boolean;
}

export interface IRoomCategory {
  id: string;
  name: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
