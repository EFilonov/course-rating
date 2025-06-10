export interface HttpService {
    request<T extends object | object[]>(
        url: string,
        method?: string,
        body?: BodyInit | null,
        headers?: HeadersInit
    ): Promise<T>;
}

export const httpService = (): HttpService => {
    
    const request = async <T extends object | object[]>(
        url: string,
        method: string = 'GET',
        body: BodyInit | null = null,
        headers: HeadersInit = { 'Content-Type': 'application/json' }
    ): Promise<T> => {
        // await new Promise(resolve => setTimeout(() => resolve(''), 2000)); // имитация задержки для отладки
        const response = await fetch(url, { 
            method, 
            body, 
            headers,
            next: { revalidate: 3600} // если используется в Next.js, для кэширования ответа на 1 час 
        });

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data: T = await response.json();
        // console.log(`Response from ${url}:`, data); // для отладки, можно убрать в продакшн');

        return data;
    };

    return { request };
};