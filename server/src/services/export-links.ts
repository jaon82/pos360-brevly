import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/infra/shared/either";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { stringify } from "csv-stringify";
import { desc } from "drizzle-orm";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

type ExportLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(): Promise<Either<never, ExportLinksOutput>> {
  const { sql } = db
    .select({
      id: schema.links.id,
      url: schema.links.url,
      alias: schema.links.alias,
      views: schema.links.views,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .orderBy((fields) => {
      return desc(fields.id);
    })
    .toSQL();
  const cursor = pg.unsafe(sql).cursor(2);
  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "url", header: "Original URL" },
      { key: "alias", header: "URL alias" },
      { key: "views", header: "Access Count" },
      { key: "created_at", header: "Created at" },
    ],
  });
  const uploadToStorageStream = new PassThrough();
  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );
  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: `${new Date().toISOString()}-uploads.csv`,
    contentStream: uploadToStorageStream,
  });
  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);
  return makeRight({ reportUrl: url });
}
