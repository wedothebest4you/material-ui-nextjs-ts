'use server';

import TenantQuery from './service';
import { revalidatePath } from 'next/cache';

export async function getFullList() {
  try {
    const data = await TenantQuery.getFullList();
    // please see how to avoid this hard coded value
    revalidatePath('/tenant');
    return {
      success: true,
      data: {
        ...data,
      },
    };
  } catch (error) {
    console.error('Query Action Error:', error);
    return {
      success: false,
      error: 'Failed to get full list',
    };
  }
}
