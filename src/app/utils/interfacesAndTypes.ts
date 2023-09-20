export interface CertificationForm {
    name: string;
    obtainmentDate: string;
    expires: boolean;
    expiryDate: string;
    testData: any
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}