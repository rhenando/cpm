export async function extractPdfText(data: Uint8Array): Promise<string> {
  const { DOMMatrix, ImageData, Path2D } = await import("@napi-rs/canvas");
  const nodeGlobals = globalThis as unknown as Record<string, unknown>;
  nodeGlobals.DOMMatrix ??= DOMMatrix;
  nodeGlobals.ImageData ??= ImageData;
  nodeGlobals.Path2D ??= Path2D;

  const { getData } = await import("pdf-parse/worker");
  const { PDFParse } = await import("pdf-parse");
  // Embed the matching worker so serverless deployments need no relative worker path.
  PDFParse.setWorker(getData());
  const parser = new PDFParse({ data });
  try {
    return (await parser.getText()).text;
  } finally {
    await parser.destroy();
  }
}
