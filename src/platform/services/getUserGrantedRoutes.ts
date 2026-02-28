export default async function getUserGrantedRoutes(): Promise<string[]> {
  return ['finance/ledger', 'finance/ledger/new'];
}
