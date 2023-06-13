import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { Blob } from 'node:buffer';

const bucketName = process.env.S3_BUCKET_NAME;

const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});

export const POST = async (request) => {
    // Upload Images
    const formData = await request.formData();
    // console.log(formData);
    const file = formData.get('file');
    const { name, type } = file;
    if (file instanceof Blob) {
        // Convert file to stream
        const stream = file.stream();

        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        const ext = name.split('.').pop();
        const oldFilename = name.split('.').shift();
        const newFilename = oldFilename + '-' + Date.now() + '.' + ext;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: buffer,
            ACL: 'public-read',
            ContentType: type,
        });

        await client.send(command);
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

        return new NextResponse(JSON.stringify({ link }), {
            status: 200,
        });
    }
};
