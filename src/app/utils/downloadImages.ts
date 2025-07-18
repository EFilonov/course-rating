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

        // Check if the file already exists in the folder
        if (fs.existsSync(filePath)) {
            // If the file already exists, do nothing
            continue;
        }

        await new Promise<void>((resolve, reject) => {
            const client = link.startsWith('https://') ? https : http;
            client.get(link, (res) => {
                if (res.statusCode !== 200) return reject(res.statusCode);

                // Check that the response is an image
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