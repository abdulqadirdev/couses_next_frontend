'use server'
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function LoginApi(formData) {
    try {
        const data = {
            email: formData.email,
            password: formData.password
        };
        const response = await useFetch({
            endpoint: "login",
            method: "POST",
            data
        });
        if (response.success) {
            (await cookies()).set('auth-token', response.data.data.accessToken);
            (await cookies()).set('refresh-token', response.data.data.refreshToken);
            return {
                success: true,
                user: response.message,
            };
        }
        else {
            return  {
                success: false,
                error: response.error
            }
        }

        // throw new Error('Authentication failed');

    } catch (error) {
        return {
            success: false,
            error: error.message || 'Login failed'
        };
    }
}