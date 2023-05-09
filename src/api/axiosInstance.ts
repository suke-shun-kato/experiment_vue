import axios from "axios";
import type {AxiosInstance} from "axios";
import type {Auth} from "@/api/Auth";

type HttpHeader = {
    'Accept': string,
    'Content-Type': string,
    'X-Requested-With': string
    'Authorization'?: string
}

export const createAxiosInstance = (auth?: Auth): AxiosInstance => {

    return axios.create({
        baseURL: 'http://127.0.0.1:8080/api',       // TODO 環境別に定義する
        timeout: 10000,         // TODO
        headers: createHeaders(auth)
    });
}

function createHeaders(auth: Auth | undefined): HttpHeader {

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
