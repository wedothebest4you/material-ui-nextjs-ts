import { z } from 'zod';
import { secureString, secureNumber } from '@/src/shared';
import { secureNumberOptional } from '@/src/shared/zod/uilts';
export const createDTO = z.object({
  // Trim and convert to uppercase immediately at the edge
  name: secureString(),

  code: secureNumber(),

  plan: secureString(20),

  status: secureString(10),

  userLimit: secureNumberOptional(),
});

// Infer TypeScript Type for application use
export type createDTO = z.infer<typeof createDTO>;
