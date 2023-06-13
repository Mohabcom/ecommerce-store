/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [`${process.env.S3_BUCKET_NAME}.s3.amazonaws.com`],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: `https://${process.env.S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/:path*`,
    //         },
    //     ];
    // },
    // async headers() {
    //     return [
    //         {
    //             source: '/_next/:path*',
    //             headers: [
    //                 {
    //                     key: 'Access-Control-Allow-Origin',
    //                     value: `https://${process.env.S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/`,
    //                 },
    //             ],
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
