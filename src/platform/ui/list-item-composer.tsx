import ListItemBranch from './list-item-branch';
import ListItemLeaf from './list-item-leaf';

export default function ListItemComposer({
  description,
  children,
}: {
  description: string;
  children: React.ReactNode;
}) {
  return children ? (
    <ListItemBranch description={description} children={children} />
  ) : (
    <ListItemLeaf description={description} />
  );
}
