'use server'
import axios from 'axios';

export default async function useFetch(ReqConfig) {
    const { 
        endpoint = '/',
        method = "GET", 
        headers = {}, 
        data = {} 
    } = ReqConfig;
    
   const url = process.env.API_URL + endpoint;
   
    try {
        const response = await axios({
            method,
            url,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            data: method !== 'GET' ? data : undefined
        });

        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                error: error.response?.data || error.message,
                status: error.response?.status || 500
            };
        }
        
        return {
            success: false,
            error: 'An unexpected error occurred',
            status: 500
        };
    }
}