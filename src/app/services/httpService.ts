export interface HttpService {
    request<T extends object[]>(
        url: string,
        method?: string,
        body?: BodyInit | null,
        headers?: HeadersInit
    ): Promise<T[]>;
}

export const httpService = (): HttpService => {
    const request = async <T extends object[]>(
        url: string,
        method: string = 'GET',
        body: BodyInit | null = null,
        headers: HeadersInit = { 'Content-Type': 'application/json' }
    ): Promise<T> => {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data: T = await response.json();

        return data;
    };

    return { request };
};