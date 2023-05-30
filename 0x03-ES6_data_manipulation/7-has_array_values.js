export default function hasValuesFromArray(s, arr) {
  for (const j of arr) {
    if (!s.has(j)) {
      return false;
    }
  }
  return true;
}
