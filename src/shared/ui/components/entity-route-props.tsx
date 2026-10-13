type FabWithEntityRouteProps =
  | {
      action: 'add';
      entityId?: undefined;
      children: React.ReactNode;
    }
  | {
      action: 'edit' | 'delete' | 'view';
      entityId: string;
      children: React.ReactNode;
    };

export default FabWithEntityRouteProps;
