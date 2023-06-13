const http = require('http');
const fs = require('fs');

const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
const HOST = 'localhost';
const PORT = 1245;

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Ngoni19 <https://github.com/Ngoni19>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reportParts = [];
        const fileL = data.toString('utf-8').trim().split('\n');
        const studentG = {};
        const dbFieldNames = fileL[0].split(',');
        const studentPNames = dbFieldNames.slice(
          0,
          dbFieldNames.length - 1,
        );

        for (const line of fileL.slice(1)) {
          const studentR = line.split(',');
          const studentPV = studentR.slice(
            0,
            studentR.length - 1,
          );
          const field = studentR[studentR.length - 1];
          if (!Object.keys(studentG).includes(field)) {
            studentG[field] = [];
          }
          const studentEntries = studentPNames.map((propName, idx) => [
            propName,
            studentPV[idx],
          ]);
          studentG[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentG).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentG)) {
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseTxt = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseTxt.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseTxt));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseP = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseP.push(report);
          const responseTxt = responseP.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseTxt.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseTxt));
        })
        .catch((err) => {
          responseP.push(err instanceof Error ? err.message : err.toString());
          const responseTxt = responseP.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseTxt.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseTxt));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
