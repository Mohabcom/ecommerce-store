import * as aws from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const bucketName = process.env.S3_BUCKET_NAME;

const client = new aws.S3({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});
export const DELETE = async (request) => {
    // Delete Image
    const filename = request.url.split('/images/')[1];

    if (filename) {
        await client.deleteObject({
            Bucket: bucketName,
            Key: filename,
        });
        return new NextResponse(JSON.stringify(filename), {
            status: 200,
        });
    }
};
