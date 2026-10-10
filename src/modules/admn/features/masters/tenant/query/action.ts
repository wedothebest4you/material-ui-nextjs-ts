'use server';
import { revalidatePath } from 'next/cache';
import { type ActionState } from '@/src/shared';
import Tenant from './model';
import TenanatService from './service';

export async function getActiveTenants(
  prevState: ActionState,
  tenantFormData: FormData,
): Promise<ActionState> {
  try {
    TenanatService.getActiveTenants();

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
