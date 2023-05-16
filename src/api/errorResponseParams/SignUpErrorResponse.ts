import type {LoginValidationErrors} from "@/api/errorResponseParams/LoginErrorResponse";
import type {BaseErrorResponse} from "@/api/errorResponseParams/BaseErrorResponse";

export interface SignUpErrorResponse extends BaseErrorResponse {
    // バリデーションエラーのときerrorsの値がある
    errors?: SignUpValidationErrors
}

export interface SignUpValidationErrors extends LoginValidationErrors{
    name: string[]
}