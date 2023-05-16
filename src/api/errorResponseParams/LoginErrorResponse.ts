import type {BaseErrorResponse} from "@/api/errorResponseParams/BaseErrorResponse";

export interface LoginErrorResponse extends BaseErrorResponse {
    // バリデーションエラーのときerrorsの値がある
    errors?: LoginValidationErrors
}

export interface LoginValidationErrors {
    email: string[]
    password: string[]
}