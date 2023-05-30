export default function cleanSet(set, startString) {
  if (!startString || !startString.length || typeof startString !== 'string') return '';

  let fString = '';
  set.forEach((element) => {
    if (element && element.startsWith(startString)) fString += `${element.slice(startString.length)}-`;
  });

  return fString.slice(0, fString.length - 1);
}
