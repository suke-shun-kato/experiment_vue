export interface LoginError {
    message: string
    // バリデーションエラーのときerrorsの値がある
    errors?: LoginValidationError
}

export interface LoginValidationError {
    email: string[]
    password: string[]
}