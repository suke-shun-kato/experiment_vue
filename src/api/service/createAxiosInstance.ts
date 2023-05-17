import axios from "axios";
import type {AxiosInstance} from "axios";
import type {AuthResponse} from "@/api/responseParams/AuthResponse";

type HttpHeader = {
    'Accept': string,
    'Content-Type': string,
    'X-Requested-With': string
    'Authorization'?: string
}

export const createAxiosInstance = (auth?: AuthResponse): AxiosInstance => {

    return axios.create({
        baseURL: import.meta.env.VITE_API_ENDPOINT,
        timeout: 10000,         // タイムアウト[ミリ秒]
        headers: createHeaders(auth)
    });
}

function createHeaders(auth: AuthResponse | undefined): HttpHeader {

    const headers: HttpHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }

    if (auth !== undefined) {
        headers.Authorization = `${auth.token_type} ${auth.access_token}`
    }

    return headers
}
