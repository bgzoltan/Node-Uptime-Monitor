import http from "http";
import url from "url";
import { StringDecoder } from "string_decoder";

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

  // Get the headesr as object
  const headers = req.headers;

  // Get the payload if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    // Choose the handler this request should go to
    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
    };

    chosenHandler(data, function (statusCode, payload) {
      // Use the status code called back by the handler or use default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof payload == "object" ? payload : {};

      // Convert payload to string
      const payloadString = JSON.stringify(payload);

      // Return the response
      console.log("Returning ...", statusCode, payloadString);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});

//  Start the server
server.listen(3300, function () {
  console.log("Server is listening on port: 3300");
});

//  Check the server
server.on("request", (req) => {
  console.log(`Server check / request received: ${req.method} ${req.url}`);
});

// Define handlers
const handlers = {};

handlers.sample = function (data, callback) {
  callback(406, { name: "sample handler" });
};

handlers.notFound = function (data, callback) {
  callback(404);
};

// Define request routes
const router = {
  sample: handlers.sample,
};
