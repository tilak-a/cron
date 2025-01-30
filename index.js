const http = require("http");
const https = require("https");

const PORT = process.env.PORT || 3000;
const SELF_URL = "https://your-app-name.onrender.com"; // https://cron-566y.onrender.com
const PING_URL =
  "https://corr.onrender.com/http://3.109.226.210:1111/opsservice/master/getallfinancialyears";

// Simple HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Server is running...");
});

// Function to make GET requests
const pingServer = url => {
  const client = url.startsWith("https") ? https : http;

  client
    .get(url, res => {
      console.log(`Ping Success: ${url} → Status: ${res.statusCode}`);
    })
    .on("error", err => {
      console.error(`Ping Failed: ${url} → ${err.message}`);
    });
};

// Keep-alive function
const keepAlive = () => {
  setInterval(() => {
    pingServer(SELF_URL); // Ping itself
    pingServer(PING_URL); // Ping external API
  }, 2 * 60 * 1000); // Every 2 minutes
};

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  keepAlive(); // Start self-pinging when the server starts
});
