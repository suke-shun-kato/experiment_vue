import axios from "axios";
import {ErrorResponseStatusCodes} from "@/api/StatusCode";
import type {StatusCode} from "@/api/StatusCode";
import type {Ref} from "vue";
import type {BaseErrorResponse} from "@/api/errorResponseParams/BaseErrorResponse";

export const executeFormApi = async <T extends BaseErrorResponse> (
    errorResponseRef: Ref<T|undefined>,
    executeFunc: () => Promise<void>
): Promise<void> => {

    try {
        await executeFunc()
    } catch (e: any) {
        console.error(e)
        if (axios.isAxiosError(e)) {
            if (e.response !== undefined
                && ErrorResponseStatusCodes.includes(e.response?.status as StatusCode)) {
                // 認証エラー、バリデーションエラー
                errorResponseRef.value = e.response?.data
            } else {
                errorResponseRef.value = {
                    message: e.message
                } as T
            }
        } else {
            errorResponseRef.value = {
                message: 'runtime error'
            } as T
        }

    }
}
