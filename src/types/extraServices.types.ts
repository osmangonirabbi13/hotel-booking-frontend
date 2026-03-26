

export interface ICreateExtraService {
    serviceName: string;
    serviceAmount: number;
    isActive: boolean;
}

export interface IUpdateExtraService {
    serviceName?: string;
    serviceAmount?: number;
    isActive?: boolean;
}

export interface IExtraService {
    id: string;
    serviceName: string;
    serviceAmount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
