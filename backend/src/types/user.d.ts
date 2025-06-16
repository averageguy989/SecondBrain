
export type UserRole = 'admin' | 'user';

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    password: string | null;
    role: UserRole | null;
}





