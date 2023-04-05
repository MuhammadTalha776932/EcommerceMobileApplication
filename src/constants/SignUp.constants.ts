import { AxiosRequestConfig } from "axios";
import { token } from "./token";

export const SignUpPostConfig:AxiosRequestConfig = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
}
