// actually does not matter that it is aws, but I am lazy to change the namings and keeping it consistent
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FileModel } from "../model";
import { fileMetadata } from "../schema";

const db = drizzle(process.env.DATABASE_URL);
await migrate(db, {
  migrationsFolder: "./drizzle/migrations",
});

export const upsertFileMetadata = async (file: FileModel) => {
  await db.insert(fileMetadata).values(file).onConflictDoNothing();
};
