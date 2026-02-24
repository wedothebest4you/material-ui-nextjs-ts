import { bootstrapPlatform } from '../bootstrap/bootstrapPlatform';
import { resolveNavigation } from '../services/NavigationService';
import { NavigationItemBase } from '@/shared/index';
import ShellLayout from './ShellLayout';

export default async function PlatformShell({
  children,
}: {
  navigation: NavigationItemBase<string>[];
  children: React.ReactNode;
}) {
  const navigation = await resolveNavigation();

  return <ShellLayout navigation={navigation}>{children}</ShellLayout>;
}
