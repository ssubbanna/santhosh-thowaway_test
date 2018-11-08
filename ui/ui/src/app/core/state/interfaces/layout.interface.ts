export type Themes =
  'app-theme-default'
  | 'app-theme-extreme-light'
  | 'app-theme-extreme-dark'
  | 'app-theme-sass-cloud-light'
  | 'app-theme-sass-cloud-dark';

export type ElevationSize =
  | 'mat-elevation-z0'
  | 'mat-elevation-z1'
  | 'mat-elevation-z2'
  | 'mat-elevation-z3'
  | 'mat-elevation-z4'
  | 'mat-elevation-z5'
  | 'mat-elevation-z6'
  | 'mat-elevation-z7';

export interface ILayout {
  theme: Themes;
  elevation: boolean;
  elevationSize: ElevationSize;
  showSideNav: boolean;
  showRightSidenav: boolean;
  miniSideNav: boolean;
  showUserControls: boolean;
  showHeaderSideNavToggle: boolean;
  showWidgetsSideNav: boolean;
  userToggledSideNav: boolean;
  autoToggledSidenav: boolean;
}

export function layoutFactory(): ILayout {
  return {
    theme: 'app-theme-sass-cloud-light',
    elevation: true,
    elevationSize: 'mat-elevation-z7',
    showSideNav: true,
    showRightSidenav: false,
    showWidgetsSideNav: false,
    miniSideNav: false,
    showUserControls: true,
    showHeaderSideNavToggle: true,
    userToggledSideNav: false,
    autoToggledSidenav: false
  };
}
