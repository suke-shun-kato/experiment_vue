import type {BaseResponse} from "@/api/responseParams/BaseResponse";

export interface RecipesResponse {
    recipes: Recipe[]
}

export interface Recipe extends BaseResponse {
    id: number
    user_id: number
    title: string
    description: string
    images: Image[],
}

export interface Image extends BaseResponse {
    id: number
}

