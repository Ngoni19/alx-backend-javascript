export default function guardrail(mathFunction) {
  const queue = [];
  let x;
  try {
    x = mathFunction();
  } catch (error) {
    x = `Error: ${error.message}`;
  }
  queue.push(x);
  queue.push('Guardrail was processed');

  return queue;
}
