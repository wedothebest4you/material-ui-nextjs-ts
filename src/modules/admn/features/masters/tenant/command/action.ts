'use server';
import { revalidatePath } from 'next/cache';
import { type ActionState } from '@/src/shared';
import TenantService from './service';
import { TenantDTO } from './zod_schema';

export default async function tenatReducerAction(
  prevState: ActionState,
  tenantFormData: TenantDTO,
): Promise<ActionState> {
  try {
    TenantService.createOrUpdateTenant(tenantFormData);
    return { success: true, message: '' };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create the Tenant',
    };
  }
}
