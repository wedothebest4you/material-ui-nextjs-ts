//shows strategic and operational dashboards in the same UI.
import StrategicDashBoard from './components/strategic-dashboard';
import OperationalDashboard from './components/operational-dashboard';

export default function Dashboard() {
  return (
    <>
      Finance Dashboard
      <StrategicDashBoard />
      <OperationalDashboard />
    </>
  );
}
