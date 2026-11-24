import { z } from 'zod';
import { secureString, secureNumber } from '@/src/shared/client';
import TENANT from '../schema';

export const tenantDTO = z.object({
  // Trim and convert to uppercase immediately at the edge
  name: secureString().max(TENANT.name.length, TENANT.name.maxLength),

  code: secureString().max(15, TENANT.code.maxLength),

  plan: z.enum(TENANT.plan.enum.value, TENANT.plan.enum.message),

  // planId: z.enum(planIdEnum, TENANT.plan.enum.message),
  userLimit: z.union([
    z.literal(TENANT.userLimit.enum.value[0], TENANT.userLimit.enum.message),
    z.literal(TENANT.userLimit.enum.value[1]),
    z.literal(TENANT.userLimit.enum.value[2]),
  ]),

  status: z.enum(TENANT.status.enum.value, TENANT.status.enum.message),

  // userLimit: z.union(
  //   TENANT.userLimit.enum.value.map((v) => z.literal(v)),
  //   TENANT.userLimit.enum.message,
  // ),
  id: z.string().optional(),
});

// Infer TypeScript Type for application use
export type TenantDTO = z.infer<typeof tenantDTO>;
export type TenantKeys = keyof TenantDTO;
