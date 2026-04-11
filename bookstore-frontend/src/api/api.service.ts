import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
    // private readonly baseUrl = 'http://localhost:5000/api';
    private readonly baseUrl = 'http://localhost:5000/api';

    constructor(private readonly httpService: HttpService) { }

    async get(endpoint: string, headers: any = {}): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.get(url, { headers })
            );
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }

    async post(endpoint: string, data: any, headers: any = {}): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.post(url, data, { headers })
            );
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }

    async put(endpoint: string, data: any, headers: any = {}): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.put(url, data, { headers })
            );
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }

    async delete(endpoint: string, headers: any = {}): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.delete(url, { headers })
            );
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
}
