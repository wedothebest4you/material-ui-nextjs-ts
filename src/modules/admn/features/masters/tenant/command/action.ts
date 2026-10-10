'use server';
import { revalidatePath } from 'next/cache';
import { type ActionState } from '@/src/shared';
import TenantService from './service';

export default async function tenatReducer(
  prevState: ActionState,
  tenantFormData: FormData,
): Promise<ActionState> {
  try {
    TenantService.createOrUpdateTenant(tenantFormData);

    revalidatePath('/tenant');
    return { success: true, message: '' };
  } catch (error) {
    console.error('Command Action Error:', error);
    return {
      success: false,
      message: 'Failed to create the Tenant',
    };
  }
}
