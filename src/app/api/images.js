import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as aws from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';

const bucketName = 'muhab-next-ecommerce';

export default async function handle(req, res) {
    const { method } = req;
    const client = new aws.S3({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    // Delete Image
    if (method === 'DELETE') {
        if (req.query?.link) {
            //
            //
            const link = req.query?.link;
            const filename = link.split('/').pop();
            await client.deleteObject({
                Bucket: bucketName,
                Key: filename,
            });
            return res.json(filename);
        }
    }
    // Upload Images
    if (method === 'POST') {
        const form = new multiparty.Form();
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });
        const links = [];
        for (const file of files.file) {
            const ext = file.originalFilename.split('.').pop();
            const newFilename = Date.now() + '.' + ext;
            await client.send(
                new aws.PutObjectCommand({
                    Bucket: bucketName,
                    Key: newFilename,
                    Body: fs.readFileSync(file.path),
                    ACL: 'public-read',
                    ContentType: mime.lookup(file.path),
                }),
            );
            const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
            links.push(link);
        }
        return res.json({ links });
    }
}

// export const config = {
//     api: { bodyParser: false },
// };
