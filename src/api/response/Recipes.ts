import type {ResponseBase} from "@/api/response/ResponseBase";

export interface Recipes {
    recipes: Recipe[]
}

export interface Recipe extends ResponseBase {
    id: number
    user_id: number
    title: string
    description: string
    images: Image[],
}

export interface Image extends ResponseBase{
    id: number
}

