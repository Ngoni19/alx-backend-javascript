const fs = require('fs');
const express = require('express');

const app = express();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
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

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const responseP = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseP.push(report);
      const responseText = responseP.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    })
    .catch((err) => {
      responseP.push(err instanceof Error ? err.message : err.toString());
      const responseText = responseP.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
