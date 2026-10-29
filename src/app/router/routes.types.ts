export type RouteItem = {
  id: string;
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  icon?: React.FC;
};

export type RouteItems = RouteItem[];
