import express from 'express';
import cors from 'cors';
import client from 'prom-client';

const app = express();
const port = 5000;

app.use(cors());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const requestCounter = new client.Counter({
  name: "node_request_operations_total",
  help: "Total number of requests",
});

app.get("/", (req, res) => {
requestCounter.inc();
  res.json({
    success: true,
    message:"backend is working"
  })
});

app.get("/heavy", (req, res) => {
  requestCounter.inc();
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += i;
  }
    res.json({
    success: true,
    message:"heavy cpu task completed",
    result: sum
  })
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port,"0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});