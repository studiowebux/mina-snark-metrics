const http = require("node:http");
const client = require("prom-client");
const getReadings = require("./collect");
const Gauges = require("./gauges");

const PROMETHEUS_PORT = process.env.PROMETHEUS_PORT || 9999;
const n_block = process.env.N_BLOCKS || 100;
const gauges = Gauges(n_block);

if (!process.env.ENDPOINT) throw new Error('Missing `export ENDPOINT=""`');
if (!process.env.PUBLIC_KEY) throw new Error('Missing `export PUBLIC_KEY=""`');

const register = new client.Registry();

// ---
async function collectMetrics() {
  const { response } = await getReadings();
  labels = response.map((r) => r[0]);
  data = response.map((r) => r[1]);
}

// metrics
let data, labels;

// Register each metric
gauges.forEach((gauge) => {
  register.registerMetric(
    new client.Gauge({
      name: gauge.key,
      help: gauge.help,
      collect() {
        const currentValue = data[labels.indexOf(gauge.key)];
        this.set(currentValue);
      },
    })
  );
});

// Define the HTTP server
const server = http.createServer(async (req, res) => {
  try {
    const route = req.url;

    if (route === "/metrics") {
      // Refresh Values
      await collectMetrics();

      res.setHeader("Content-Type", register.contentType);
      return res.end(await register.metrics());
    }

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 400;
    return res.end(JSON.stringify({ message: "Go to /metrics" }));
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    return res.end(JSON.stringify({ message: e.message, stack: e.stackTrace }));
  }
});

server.listen(PROMETHEUS_PORT, () => {
  console.log(`Listening on port ${PROMETHEUS_PORT}`);
});
