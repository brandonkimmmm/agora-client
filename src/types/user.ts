export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUser {
    id: number;
    email: string | null;
    username: string;
    first_name: string | null;
    last_name: string | null;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
