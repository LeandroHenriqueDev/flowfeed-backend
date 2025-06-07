export interface CreateLikeDto {
    id?: number,
    post_id: number,
    user_id: number
}

export interface UpdateLikeDto extends Partial<CreateLikeDto> { } 

export interface Response {
    like_id: number,
    posts: {
        id: number
    },
    user: {
        id: number
    }
}