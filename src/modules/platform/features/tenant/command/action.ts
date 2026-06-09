'use server';

import TenantCommand from './service';
import { TenantDTO, tenantDTO } from './dto';
import { TenantSchemaType } from './schema';
import { revalidatePath } from 'next/cache';
import { type ActionState } from '@/src/shared';
import Tenant from './model';

export async function saveTenantAction(
  prevState: ActionState,
  tenantFormData: FormData,
): Promise<ActionState> {
  try {
    const rawData = Object.fromEntries(tenantFormData.entries());
    const cleanData = tenantDTO.parse(rawData);
    Tenant.createOrUpdateTenant(cleanData);

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
