import http from "http";
import url from "url";

// The server responds for every requests
const server = http.createServer(function (req, res) {
  // Get the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get method
  const method = req.method.toLowerCase();

  // Get the query string
  const queryStringObject = parsedUrl.query;

  // Logs
  const text = `This is my NodeJs server...Path: ${path} / ${trimmedPath} Method:${method}}`;
  console.log("Query object:", queryStringObject);

  // Send a response
  res.end(text);
});

//  Start the server
server.listen(3000, function () {
  console.log("Server is listening on port: 3000");
});

//  Check the server
server.on("request", (req) => {
  console.log(`Server check / request received: ${req.method} ${req.url}`);
});
