import { z } from 'zod';

/**
 * 🧵 UNIVERSAL SECURE STRING FACTORY
 * Prevents: Script injections (< >), Mongoose trim collapses, and memory overflows.
 */
export const secureString = (maxLength: number = 100) => {
  return z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Required field missing'
          : 'Must be a text string',
    })

    .max(maxLength, { message: `Cannot exceed ${maxLength} characters` })
    .refine((val) => !/[<>]/.test(val), {
      message: 'Script injection characters (< or >) detected',
    })
    .regex(/\S/, { message: 'Cannot be empty or composed entirely of spaces' });
};

/**
 * 🔢 UNIVERSAL SECURE NUMBER FACTORY
 * Prevents: JavaScript floating-point errors, integer overflows, and malicious NaN/Infinity payloads.
 */
export const secureNumber = (min: number = 0, max: number = 1_000_000_000) => {
  return (
    z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? 'Required field missing'
            : 'Must be a valid number',
      })
      // 🛡️ RISK: Stops NaN, Infinity, and -Infinity values which can corrupt MongoDB queries
      .finite({ message: 'Number must be finite' })
      .min(min, { message: `Value must be at least ${min}` })
      // 🛡️ RISK: Prevent massive numbers from breaking 64-bit integer limits in DB operations
      .max(max, { message: `Value cannot exceed ${max}` })
  );
};

export const secureStringOptional = (maxLength: number) => {
  return z.preprocess(
    (val) => (val === '' ? undefined : val),
    secureString(maxLength).optional(),
  );
};

export const secureNumberOptional = (min: number, max: number) => {
  return z.preprocess(
    (val) => (val === '' ? undefined : val),
    secureNumber(min, max).optional(),
  );
};
