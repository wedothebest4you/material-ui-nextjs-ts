'use client';

import { useActionState } from 'react';
import tenantReducer from './action';
import { ActionState } from '@/src/shared';

// type TenantWorkspaceState = {
//   selectedTenantId?: string;
//   form: TenantForm;
//   searchText: string;
//   tenants: TenantSummary[];
//   mode: 'new' | 'selected';
// };

const initialState: ActionState = { success: false, message: undefined };

export default function TenantWorkspace() {
  return (
    <div className="tenant-workspace">
      <TenantWorkspaceHeader />

      <TenantWorkspaceBody>
        <TenantEditorPanel />
        <TenantListPanel />
      </TenantWorkspaceBody>

      <TenantWorkspaceFooter />
    </div>
  );
}

export function TenantWorkspaceHeader() {
  return (
    <header>
      <h1>Tenant Workspace</h1>
    </header>
  );
}

type Props = {
  children: React.ReactNode;
};

export function TenantWorkspaceBody(props: Props) {
  return (
    <main
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1rem',
      }}
    >
      {props.children}
    </main>
  );
}

export function TenantEditorPanel() {
  return (
    <section>
      <TenantForm />
      <TenantCommandBar />
    </section>
  );
}

export function TenantForm() {
  return (
    <form>
      <div>
        <label>Name</label>
        <input />
      </div>

      <div>
        <label>Code</label>
        <input />
      </div>

      <div>
        <label>Plan</label>
        <select />
      </div>

      <div>
        <label>Status</label>
        <select />
      </div>

      <div>
        <label>User Limit</label>
        <input />
      </div>
    </form>
  );
}
export function TenantCommandBar() {
  return (
    <div>
      <button>New</button>

      <button>Save</button>

      <button>Delete</button>

      <button>Refresh</button>
    </div>
  );
}
export function TenantListPanel() {
  return (
    <aside>
      <TenantSearchBox />
      <TenantList />
    </aside>
  );
}
export function TenantSearchBox() {
  return <input type="search" placeholder="Search tenants" />;
}

export function TenantList() {
  return (
    <ul>
      <li>Acme Corp</li>
      <li>Global Trading</li>
      <li>Demo Tenant</li>
    </ul>
  );
}
export function TenantWorkspaceFooter() {
  return <footer>Total Tenants: 125</footer>;
}
