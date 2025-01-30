const PING_URL =
  "https://corr.onrender.com/http://3.109.226.210:1111/opsservice/master/getallfinancialyears";

const pingServer = async () => {
  try {
    const response = await fetch(PING_URL);
    console.log("Ping Successful:", response.status);
  } catch (error) {
    console.error("Ping Failed:", error.message);
  }
};

pingServer(); // Run once on start

setInterval(pingServer, 2 * 60 * 1000); // Run every 2 minutes
