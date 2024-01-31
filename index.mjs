import http from 'http';
import { deleteBook, getBook, getBookList, insertBook, updateBook } from './mock-db.mjs';


const handleRequest = (req, res) => {
  const { url, method } = req;
  if (url === "/api/books") {
    if (method === "GET") {
      try {
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(getBookList()));
        res.statusCode = 200;
        res.end();
      } catch (error) {
        res.statusCode = 500;
        res.end();
      }
    } else if (method === "POST") {
        let data = [];
        req.on("data", (chunk) => {
            console.log({chunk});
            data += chunk;
        });

        req.on("end", () => {

            const book = JSON.parse(data.toString("utf-8"));
            const newBook = insertBook(book);
            res.setHeader("Content-Type","application/json");
            res.statusCode = 201;
            res.write(JSON.stringify(newBook));
            res.end();
        });

    }
  } else if (/\/api\/books\/\d$/.test(url) ) {

      const [, bookIdString] = url.match(/\/api\/books\/(\d)$/);
      const bookId = Number(bookIdString);
   if(method === "GET") {

       res.setHeader("Content-Type", "application/json");
       const book = getBook(bookId);
       res.write(JSON.stringify(book));
       res.statusCode = 200;
       res.end();
   }  else if (method == "PUT") {
  let data = [];
  req.on("data", (chunk) => {
    console.log({ chunk });
    data += chunk;
  });

  req.on("end", () => {
    const book = JSON.parse(data.toString("utf-8"));
    updateBook(bookId, book);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 204;
    res.end();
  });

   } else if(method === "DELETE") {
    deleteBook(bookId);
    res.statusCode = 204;
    res.end();
   }

  } else {
    res.statusCode = 404;
    res.end();
  }
};

const server = http.createServer(handleRequest);

server.listen(3400);
console.log("Rest API running on port http:localhost:3400");




