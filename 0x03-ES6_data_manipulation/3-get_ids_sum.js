export default function sumStudentIds(arr = []) {
  return arr.reduce((acc, student) => acc + student.id, 0);
}
