export function fixDoubleHttp(url: string): string {
    const secondHttpIndex = url.indexOf('http', 1); // ищем 'http' начиная со второго символа
    if (secondHttpIndex !== -1) {
        return url.slice(secondHttpIndex);
    }
    return url;
}