import http from "http";
import { getBookList } from "./mock-db.mjs";

// GET /api/books
const handleRequest = (req, res) => {
  const { url, method } = req;
  if (url === "/api/books" && method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(getBookList()));
    res.statusCode = 200;
    res.end();
  } else {
    res.write("My awesome books portal");
    res.end();
  }
};

const server = http.createServer(handleRequest);

server.listen(3400);
console.log("Rest API running on port http:localhost:3400");
