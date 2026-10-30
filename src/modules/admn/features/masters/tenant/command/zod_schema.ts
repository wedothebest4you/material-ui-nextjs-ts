import { z } from 'zod';
import { secureString, secureNumber } from '@/src/shared/client';
import TENANT, { planEum } from '../schema';

export const tenantDTO = z.object({
  // Trim and convert to uppercase immediately at the edge
  name: secureString().max(30, TENANT.name.maxLength),

  code: secureString().max(15, TENANT.code.maxLength),

  plan: z.enum(planEum, TENANT.plan.enum.message),

  status: z.enum(TENANT.status.enum.value, TENANT.status.enum.message),

  userLimit: z.union(
    TENANT.userLimit.enum.value.map((v) => z.literal(v)),
    TENANT.userLimit.enum.message,
  ),
});

// Infer TypeScript Type for application use
export type TenantDTO = z.infer<typeof tenantDTO>;
