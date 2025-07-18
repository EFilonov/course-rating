export function fixDoubleHttp(url: string): string {
    const secondHttpIndex = url.indexOf('http', 1); // search for 'http' starting from the second character
    if (secondHttpIndex !== -1) {
        return url.slice(secondHttpIndex);
    }
    
    return url;
}