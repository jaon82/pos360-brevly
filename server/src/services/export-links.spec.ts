import { isRight, unwrapEither } from "@/infra/shared/either";
import * as upload from "@/infra/storage/upload-file-to-storage";
import { makeLink } from "@/test/factories/make-link";
import { randomUUID } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { exportLinks } from "./export-links";

describe("Export links", () => {
  it("should be able to export links", async () => {
    const linkStub = vi
      .spyOn(upload, "uploadFileToStorage")
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: "http://example.com/file.csv",
        };
      });

    const link1 = await makeLink();
    const link2 = await makeLink();
    const link3 = await makeLink();
    const link4 = await makeLink();
    const link5 = await makeLink();
    const sut = await exportLinks();
    const generatedCSVStream = linkStub.mock.calls[0][0].contentStream;
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];
      generatedCSVStream.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });
      generatedCSVStream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf-8"));
      });
      generatedCSVStream.on("error", (err) => {
        reject(err);
      });
    });
    const csvAsArray = csvAsString
      .trim()
      .split("\n")
      .map((row) => row.split(","));
    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).reportUrl).toBe("http://example.com/file.csv");
    expect(csvAsArray.slice(0, 6)).toEqual([
      ["ID", "Original URL", "URL alias", "Views", "Created at"],
      [
        link5.id,
        link5.url,
        link5.alias,
        link5.views.toString(),
        expect.any(String),
      ],
      [
        link4.id,
        link4.url,
        link4.alias,
        link4.views.toString(),
        expect.any(String),
      ],
      [
        link3.id,
        link3.url,
        link3.alias,
        link3.views.toString(),
        expect.any(String),
      ],
      [
        link2.id,
        link2.url,
        link2.alias,
        link2.views.toString(),
        expect.any(String),
      ],
      [
        link1.id,
        link1.url,
        link1.alias,
        link1.views.toString(),
        expect.any(String),
      ],
    ]);
  });
});
