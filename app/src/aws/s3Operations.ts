import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { FileUpload } from "../model";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export const uploadObject = async (fileUpload: FileUpload) => {
  const buffer = Buffer.from(await fileUpload.file.arrayBuffer());
  const key = fileUpload.filename;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: fileUpload.file.type,
    })
  );
};

export const getTemporaryUrl = async (key: string): Promise<string> => {
  const getCommand = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
};
