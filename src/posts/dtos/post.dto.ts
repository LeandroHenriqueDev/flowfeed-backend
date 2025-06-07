export interface CreatePostDto {
    user_id: number,
    description: string,
    img_url: string,
    posted_at: Date
}

export interface UpdatePostDto extends Partial<CreatePostDto> { }

export interface ResponsePostDto{
    id: number,
    user: {
        id: number,
        name: string,
        profile_picture: string
    }
    desc: string,
    img_url: string,
    posted_at: Date
}
