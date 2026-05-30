'use server';

import TenantCommand from './service';
import { createDTO } from './dto';
import { TenantSchemaType } from './schema';
import { revalidatePath } from 'next/cache';
import { type ActionState } from '@/src/shared';

export async function createTenantAction(
  prevState: ActionState,
  tenantFormData: FormData,
): Promise<ActionState> {
  try {
    const rawData = Object.fromEntries(tenantFormData.entries());
    const cleanData = createDTO.parse(rawData);
    await TenantCommand.createTenant(cleanData);

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
