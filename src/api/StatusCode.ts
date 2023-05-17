export const StatusCodes = {
    OK: 200,
    Created: 201,
    BadRequest: 400,
    Unauthorized: 401,  // 認証エラー
    Forbidden: 403,
    NotFound: 404,
    Unprocessable: 422  // バリデーションエラー
} as const

// StatusCodes の valueの値のリテラル型を定義
export type StatusCode = (typeof StatusCodes)[keyof typeof StatusCodes]

// API エラーレスポンス用の定数
export const ErrorResponseStatusCodes: StatusCode[] = [StatusCodes.Unauthorized, StatusCodes.Unprocessable]
