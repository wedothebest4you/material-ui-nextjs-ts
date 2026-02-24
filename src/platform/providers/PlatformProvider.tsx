import { bootstrapPlatform } from '../bootstrap/bootstrapPlatform';
import { resolveNavigation } from '../services/NavigationService';
import PlatformShell from '../shell/PlatformShell';

export default async function PlatformProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  bootstrapPlatform();

  const navigation = await resolveNavigation();

  return <PlatformShell navigation={navigation}>{children}</PlatformShell>;
}
