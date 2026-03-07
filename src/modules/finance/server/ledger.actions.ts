'use server';

import {
  createLedger,
  listLedgers,
  updateLedger,
  deleteLedger,
} from '../domain/ledger.service';
import { revalidatePath } from 'next/cache';

const ORG_ID = 'org_demo'; // Replace with real org context

export async function listLedgersAction() {
  const ledgerList = listLedgers(ORG_ID);
  return ledgerList;
}

export async function createLedgerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const code = formData.get('code') as string;

  if (!name || !code) {
    throw new Error('Missing fields');
  }

  await createLedger({
    orgId: ORG_ID,
    name,
    code,
  });

  revalidatePath('/finance/ledger');
}

export async function updateLedgerAction(formData: FormData) {
  await updateLedger({
    id: formData.get('id') as string,
    orgId: ORG_ID,
    name: formData.get('name') as string,
    code: formData.get('code') as string,
  });

  revalidatePath('/finance/ledger');
}

export async function deleteLedgerAction(formData: FormData) {
  await deleteLedger({
    id: formData.get('id') as string,
    orgId: ORG_ID,
  });

  revalidatePath('/finance/ledger');
}
