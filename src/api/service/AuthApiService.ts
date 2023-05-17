import type {AuthResponse} from "@/api/responseParams/AuthResponse";
import type {AxiosInstance, AxiosResponse} from "axios";
import {createAxiosInstance} from "@/api/service/createAxiosInstance";
import type {RecipesResponse} from "@/api/responseParams/RecipesResponse";

export class AuthApiService {
    private axiosInstance: AxiosInstance

    public constructor(auth: AuthResponse) {
        this.axiosInstance = createAxiosInstance(auth)
    }

    public async getRecipes(): Promise<AxiosResponse<RecipesResponse>> {
        return this.axiosInstance.get<RecipesResponse>('/recipes')
    }
}