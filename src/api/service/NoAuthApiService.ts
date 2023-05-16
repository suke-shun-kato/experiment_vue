import type {AuthResponse} from "@/api/responseParams/AuthResponse";
import type {AxiosResponse, AxiosInstance} from "axios";
import type {SignUpRequest} from "@/api/requestParams/SignUpRequest";
import {createAxiosInstance} from "@/api/utils/axiosInstance";
import type {LoginReqest} from "@/api/requestParams/LoginReqest";

export class NoAuthApiService {
    private axiosInstance: AxiosInstance

    public constructor() {
        this.axiosInstance = createAxiosInstance()
    }

    public async signUp(signUpRequest: SignUpRequest): Promise<AxiosResponse<AuthResponse>> {
        return this.axiosInstance.post<AuthResponse>('/users', signUpRequest)
    }

    public async login(loginReqParam: LoginReqest): Promise<AxiosResponse<AuthResponse>> {
        return this.axiosInstance.post<AuthResponse>('/users/login', loginReqParam)
    }
}