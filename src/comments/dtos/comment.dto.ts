export interface CreateCommentDto {
    post_id: number,
    user_id: number,
    text: string,
    posted_at: Date
}

export interface UpdateCommentDto extends Partial<CreateCommentDto> { }

export interface ResponseCommentDto {
    post: {
        id: number,
        description: string,
        posted_at: Date,
        img_url: string,
        user: {
            id: number,
            name: string,
            profile_picture: string
        }
    },
    user: {
        id: number,
        name: string,
        profile_picture: string
    }
    user_id: number,
    text: string,
    posted_at: Date
}
