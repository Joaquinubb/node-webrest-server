import http2 from "http2";
import fs from "fs";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);

    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(htmlFile);
    } else if (req.url === "/css/styles.css") {
      const cssFile = fs.readFileSync("./public/css/styles.css", "utf-8");
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(cssFile);
    } else if (req.url === "/js/app.js") {
      const jsFile = fs.readFileSync("./public/js/app.js", "utf-8");
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.write(jsFile);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 Page Not Found</h1>");
    }
    res.end();
  }
);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
