const http = require('http');

const app = http.createServer();
const HOST = 'localhost';
const PORT = 1245;

app.on('request', (_, res) => {
  const responseTxt = 'Hello Holberton School!';

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseTxt.length);
  res.statusCode = 200;
  res.write(Buffer.from(responseTxt));
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
