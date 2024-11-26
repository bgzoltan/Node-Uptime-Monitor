import http from "http";

// The server responds
const server = http.createServer(function (req, res) {
  res.end("This is my NodeJs server...");
});

//  Start the server
server.listen(3000, function () {
  console.log("Server is listening on port: 3000");
});

//  Check the server
server.on("request", (req) => {
  console.log(`Server check / request received: ${req.method} ${req.url}`);
});
