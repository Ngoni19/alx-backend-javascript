export default function getStudentGradesByCity(arr = [], city, newGrades = []) {
  return arr
    .filter(student => student.location === city)
    .map(student => {
      const grade = newGrades.find(g => g.studentId === student.id);
      return { ...student, grade: grade?.grade || 'N/A' };
    });
}
