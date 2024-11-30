import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

// Konwersja import.meta.url na absolutną ścieżkę
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function serverStaticFile(req, res) {
  const baseURL = `${req.protocol}://${req.headers.host}/`;
  const parsedURL = new URL(req.url, baseURL);

  let pathname = path.join(__dirname, "..", "static", path.normalize(parsedURL.pathname));

  console.log("Checking file:", pathname);

  // Upewnij się, że ścieżka jest absolutna
  pathname = path.resolve(pathname);

  if (fs.existsSync(pathname) && fs.statSync(pathname).isDirectory()) {
    pathname = path.join(pathname, "index.html");
  }

  console.log("Final Pathname:", pathname);

  if (fs.existsSync(pathname)) {
    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error reading file: ${err}`);
      } else {
        const extension = path.extname(pathname).toLowerCase();
        const mimeType = mimeTypes[extension] || "application/octet-stream";

        res.setHeader("Content-Type", mimeType);
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("File not found");
  }
}
