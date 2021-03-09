// iec2-instance.ts

export interface Iec2Instance {
    name: string;
    id: string;
    type: IType;
    state: string;
    az: string;
    publicIp: string;
    privateIp: string;
}

interface IType {
    name: string;
    size: number;
}
