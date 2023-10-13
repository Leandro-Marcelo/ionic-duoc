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

export interface Post {
    userId: string;
    id: string;
    title: string;
    body: string;
  }
  

export interface PostAction {
    type: string;
    payload: Post;
}