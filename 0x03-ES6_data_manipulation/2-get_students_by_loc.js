export default function getStudentsByLocation(arr, city) {
  const studentsInCity = [];

  for (const student of arr) {
    if (student.location === city) {
      studentsInCity.push(student);
    }
  }

  return studentsInCity;
}
