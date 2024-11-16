import http from "http";
import {
  getQuote,
  getQuotes,
  getRandom,
  prepareDB,
} from "./controllers/quoteController";
import { serverStaticFile } from "./util/staticServer";
