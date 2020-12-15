import { config } from "./config/config";
import AWS = require("aws-sdk");

const c = config.dev;

// Configure AWS's credentials to load the profile
const credentials = new AWS.SharedIniFileCredentials({
  profile: c.aws_profile,
});

AWS.config.credentials = credentials;

// Make sure it can recognize the S3 bucket that was created earlier
export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_region,
  params: {
    Bucket: c.aws_media_bucket,
  },
});

// Be sure that the signed url is setup so that when uploading the images
// the s3 bucket, it has some security with using signed url
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('getObject', {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

export function getPutSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('putObject', {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}
