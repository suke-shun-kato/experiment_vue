import type {AuthResParam} from "@/api/responseParams/AuthResParam";
import type {AxiosResponse, AxiosInstance} from "axios";
import type {SignUpReqParam} from "@/api/requestParams/SignUpReqParam";
import {createAxiosInstance} from "@/api/utils/axiosInstance";
import type {LoginReqParam} from "@/api/requestParams/LoginReqParam";

export class NoAuthApiService {
    private axiosInstance: AxiosInstance

    public constructor() {
        this.axiosInstance = createAxiosInstance()
    }

    public async signUp(signUpRequest: SignUpReqParam): Promise<AxiosResponse<AuthResParam>> {
        return this.axiosInstance.post<AuthResParam>('/users', signUpRequest)
    }

    public async login(loginReqParam: LoginReqParam): Promise<AxiosResponse<AuthResParam>> {
        return this.axiosInstance.post<AuthResParam>('/users/login', loginReqParam)
    }
}