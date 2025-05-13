import "dotenv/config";
import { Hono } from "hono";
import { upsertFileMetadata } from "./aws/rdsOperations";
import { getTemporaryUrl, uploadObject } from "./aws/s3Operations";
import type { FileModel, FileUpload } from "./model";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const app = new Hono();

app.post("/upload", async (c) => {
  const formData = await c.req.formData();
  const fileBuffer = formData.get("file");
  const uploader = formData.get("uploader") || "Anonymous";

  if (!(fileBuffer instanceof File) || !(typeof uploader === "string")) {
    return c.json({ error: "Please provide a valid file and uploader" }, 400);
  }

  if (fileBuffer.size > MAX_FILE_SIZE) {
    return c.json({ error: "File size exceeds the maximum limit" }, 400);
  }

  const fileUpload: FileUpload = {
    file: fileBuffer,
    filename: fileBuffer.name,
  };

  try {
    await uploadObject(fileUpload);
    console.debug("File uploaded to S3");
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to upload file" }, 500);
  }

  const fileModel: FileModel = {
    uploader,
    name: fileUpload.filename,
    size: fileUpload.file.size,
    type: fileUpload.file.type,
    temporaryUrl: await getTemporaryUrl(fileUpload.filename),
  };

  await upsertFileMetadata(fileModel);

  return c.json({ message: `File successfully uploaded by ${uploader}` });
});

export default {
  port: 8080,
  fetch: app.fetch,
};
