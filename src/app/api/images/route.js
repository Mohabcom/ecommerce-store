import multiparty from 'multiparty';
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as aws from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import { NextResponse } from 'next/server';

const bucketName = process.env.S3_BUCKET_NAME;

const client = new aws.S3({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});

export const POST = async (request) => {
    // Upload Images
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(request, (err, fields, files) => {
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
    return new NextResponse(JSON.stringify({ links }), {
        status: 200,
    });
};
