import { z } from 'zod';
import { secureString, secureNumber } from '@/src/shared';
import TENANT from '../constants';

export const createDTO = z.object({
  // Trim and convert to uppercase immediately at the edge
  name: secureString(),

  code: secureString(),

  plan: z.enum(TENANT.plan.enum.value),

  status: z.enum(TENANT.status.enum.value),

  userLimit: z.union(TENANT.userLimit.enum.value.map((v) => z.literal(v))),
});

// Infer TypeScript Type for application use
export type createDTO = z.infer<typeof createDTO>;
