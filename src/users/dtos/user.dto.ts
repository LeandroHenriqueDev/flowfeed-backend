
export interface CreateUserDto {
    id: number,
    name: string,
    email: string,
    password_hash: string,
    profile_picture?:string,
    created_at: Date
}
export interface UpdateUserDto extends Partial<CreateUserDto> { }

export interface ResponseUserDto{
    id: number,
    name: string,
    email: string,
    password_hash: string,
    profile_picture?: string,
    created_at: Date 
}

