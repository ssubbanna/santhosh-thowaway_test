export interface RouteInfo {
  path: string;
  title: string;
  text: string;
  icon: string;
  iconClass: string;
  menu: boolean;
  children: RouteInfo[];
}

export const APPROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    text: 'Dashboard',
    icon: 'dashboard',
    iconClass: 'material',
    menu: false,
    children: []
  },
  {
    path: '/systems',
    title: 'Systems',
    text: 'Systems',
    icon: 'storage',
    iconClass: 'material',
    menu: false,
    children: []
  },
  {
    path: '/alarms',
    title: 'Alarms',
    text: 'Alarms',
    icon: 'notifications',
    iconClass: 'material',
    menu: false,
    children: []
  },
  {
    path: '/maps',
    title: 'Maps',
    text: 'Maps',
    icon: 'map',
    iconClass: 'material',
    menu: false,
    children: []
  },
];
