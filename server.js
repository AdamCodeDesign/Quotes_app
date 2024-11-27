import http from "http";
import {
  getQuote,
  getQuotes,
  getRandom,
  prepareDB,
} from "./controllers/quoteController.js";
import { serverStaticFile } from "./util/staticServer.js";

const PORT = 8080;
const APP_CONTENT_TYPE = { "Content-Type": "application/json" };
const server = http.createServer(async function (req, res) {
  console.log("Request");

  prepareDB();

  if (req.url === "/api/quotes" && req.method === "GET") {
    const quotes = await getQuotes();

    if (quotes) {
      res.writeHead(200, APP_CONTENT_TYPE);
    } else {
      res.writeHead(404, APP_CONTENT_TYPE);
      quotes = { message: "Quotes not found" };
    }
    res.end(JSON.stringify(quotes));
  } else if (req.url === "/api/quotes/random" && req.method === "GET") {
    let quote = await getRandom();
    console.log(quote);

    if (quote) {
      res.writeHead(200, APP_CONTENT_TYPE);
    } else {
      res.writeHead(404, APP_CONTENT_TYPE);
      quote = { message: "Quote not found" };
    }

    res.end(JSON.stringify(quote));
  } else {
    serverStaticFile(req, res);
  }
});

server.listen(PORT);
