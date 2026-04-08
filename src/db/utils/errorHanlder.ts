export default function errorHanlder(
  errorContext: string,
  optionalContext: string | undefined,
  err: unknown,
) {
  console.error(`${errorContext} ${optionalContext || ''}`);

  if (err instanceof Error) console.error(err.message);
  else console.error(err);

  process.exit(1);
}
