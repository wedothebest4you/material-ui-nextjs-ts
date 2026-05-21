'use server';

import TenantCommand from './service';
import { TenantSchemaType } from './schema';
import { revalidatePath } from 'next/cache';

export async function createTenant(tenantFormData: TenantSchemaType) {
  try {
    await TenantCommand.createTenant(tenantFormData);

    // please see how to avoid this hard coded value
    revalidatePath('/tenant');
    return { success: true };
  } catch (error) {
    console.error('Command Action Error:', error);
    return {
      success: false,
      error: 'Failed to create the Tenant',
    };
  }
}
