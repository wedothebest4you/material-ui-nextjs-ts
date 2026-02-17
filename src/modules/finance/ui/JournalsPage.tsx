// Journals List Page UI

import PageHeader from '@shared/ui/PageHeader';
import PermissionButton from '@shared/ui/PersmissionButton';
import StatusChip from '@shared/ui/StatucChip';

export default function JournalsPage({
  journals,
  canPost,
}: {
  journals: any[];
  canPost: boolean;
}) {
  return (
    <>
      <PageHeader
        title="Journals"
        actions={
          <PermissionButton
            allowed={canPost}
            reason='="You do not have permission to post journals'
          >
            New Journal
          </PermissionButton>
        }
      />
      {journals.map((j: any) => (
        <div key={j.id} style={{ marginBottom: 12 }}>
          {j.reference} <StatusChip status={j.status} />
        </div>
      ))}
    </>
  );
}
