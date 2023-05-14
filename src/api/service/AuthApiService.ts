import type {AuthResParam} from "@/api/responseParams/AuthResParam";
import type {AxiosInstance, AxiosResponse} from "axios";
import {createAxiosInstance} from "@/api/utils/axiosInstance";
import type {Recipes} from "@/api/responseParams/Recipes";

export class AuthApiService {
    private axiosInstance: AxiosInstance

    public constructor(auth: AuthResParam) {
        this.axiosInstance = createAxiosInstance(auth)
    }

    public async getRecipes(): Promise<AxiosResponse<Recipes>> {
        return this.axiosInstance.get<Recipes>('/recipes')
    }
}