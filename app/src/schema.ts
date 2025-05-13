import * as p from "drizzle-orm/pg-core";

export const fileMetadata = p.pgTable("fileMetadata", {
  id: p.serial().primaryKey(),
  uploader: p.text(),
  name: p.text(),
  type: p.text(),
  size: p.integer(),
  temporaryUrl: p.text(),
});
