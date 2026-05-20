'use server';

import TenantCommand from './service';
import { TenantSchemaPropstype } from './props';
import { revalidatePath } from 'next/cache';

export async function createTenant(tenantFormData: TenantSchemaPropstype) {
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
