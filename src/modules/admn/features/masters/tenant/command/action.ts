'use server';
import { type ActionState } from '@/src/shared';
import TenantService from './service';
import { TenantDTO, TenantKeys } from './zod_schema';

export default async function tenatReducerAction(
  prevState: ActionState<TenantKeys>,
  tenantInput: TenantDTO,
): Promise<ActionState<TenantKeys>> {
  try {
    return TenantService.createOrUpdateTenant(tenantInput);
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to create the Tenant',
    };
  }
}
