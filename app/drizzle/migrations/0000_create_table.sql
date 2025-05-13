CREATE TABLE "fileMetadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"uploader" text,
	"name" text,
	"type" text,
	"size" integer,
	"temporaryUrl" text
);