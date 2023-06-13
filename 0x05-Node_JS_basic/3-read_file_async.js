const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Ngoni19 <https://github.com/Ngoni19>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const studentG = {};
      const dbFieldNames = fileLines[0].split(',');
      const studentPNames = dbFieldNames
        .slice(0, dbFieldNames.length - 1);

      for (const line of fileLines.slice(1)) {
        const studentR = line.split(',');
        const studentPV = studentR
          .slice(0, studentR.length - 1);
        const field = studentR[studentR.length - 1];
        if (!Object.keys(studentG).includes(field)) {
          studentG[field] = [];
        }
        const studentEntries = studentPNames
          .map((propName, idx) => [propName, studentPV[idx]]);
        studentG[field].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object
        .values(studentG)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${totalStudents}`);
      for (const [field, group] of Object.entries(studentG)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
