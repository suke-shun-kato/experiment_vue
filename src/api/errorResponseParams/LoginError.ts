export interface LoginError {
    message: string
    // バリデーションエラーのときerrorsの値がある
    errors?: LoginValidationErrors
}

export interface LoginValidationErrors {
    email: string[]
    password: string[]
}