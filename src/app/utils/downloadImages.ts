import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

export async function downloadImages(links: string[], targetDir: string) {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    for (const link of links) {
        const fileName = link.split('/').pop();
        if (!fileName) continue;
        const filePath = path.join(targetDir, fileName);

        // Проверяем, есть ли файл в папке
        if (fs.existsSync(filePath)) {
            // Если файл уже есть, ничего не делаем
            continue;
        }

        await new Promise<void>((resolve, reject) => {
            const client = link.startsWith('https://') ? https : http;
            client.get(link, (res) => {
                if (res.statusCode !== 200) return reject(res.statusCode);

                // Проверка, что это изображение
                const contentType = res.headers['content-type'];
                if (!contentType || !contentType.startsWith('image/')) {
                    return reject(`Not an image: ${link} (${contentType})`);
                }

                const fileStream = fs.createWriteStream(filePath);
                res.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
            }).on('error', reject);
        });
    }
}