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
      <WorkspaceHeader />

      <WorkspaceBody>
        <TenantEditorPanel />
        <TenantListPanel />
      </WorkspaceBody>

      <WorkspaceFooter />
    </div>
  );
}
type t = typeof TenantWorkspace;

export function WorkspaceHeader() {
  return (
    <header>
      <h1>Tenant Workspace</h1>
    </header>
  );
}

type Props = {
  children: React.ReactNode;
};

export function WorkspaceBody(props: Props) {
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
export function WorkspaceFooter() {
  return <footer>Total Tenants: 125</footer>;
}

// TenantPage

// Owns page-level concerns:

// Layout
// Data loading orchestration
// Permissions
// Navigation integration

// TenantHeader

// Owns:

// Title
// Toolbar actions
// Breadcrumbs
// Page-level commands
// TenantEditorPanel

// Owns:

// Form state
// Validation
// Create/Edit operations
// TenantListPanel

// Owns:

// Grid
// Search
// Sorting
// Pagination
// Row selection
