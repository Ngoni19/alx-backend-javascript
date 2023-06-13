process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('readable', () => {
  const nameIn = process.stdin.read();

  if (nameIn) {
    process.stdout.write(`Your name is: ${nameIn}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
