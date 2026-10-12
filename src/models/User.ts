export interface User{
    userId: string,
    name: string,
    email: string,
    password: string,
    role: UserRole
}

export enum UserRole{
    ADMIN = ' ADMIN',
    CUSTOMER = ' CUSTOMER'
}