export default function extractStudentIds(arr = []) {
  return arr.map((student) => student.id);
}