import { Action } from '@ngrx/store';
import { ElevationSize, Themes } from '../interfaces/layout.interface';

export namespace LayoutActions {

  export const SHOW_USER_CONTROLS = '[Layout] Show User Controls';

  export class ShowUserControls implements Action {
    readonly type = SHOW_USER_CONTROLS;
  }

  export const HIDE_USER_CONTROLS = '[Layout] Hide User Controls';

  export class HideUserControls implements Action {
    readonly type = HIDE_USER_CONTROLS;
  }

  export const SHOW_SIDENAV_TOGGLE = '[Layout] Show Side Nav Toggle';

  export class ShowSideNavToggle implements Action {
    readonly type = SHOW_SIDENAV_TOGGLE;
  }

  export const SHOW_RIGHT_SIDENAV = '[Layout] Show Right Side Nav';

  export class ShowRightSideNav implements Action {
    readonly type = SHOW_RIGHT_SIDENAV;
  }

  export const CLOSE_RIGHT_SIDENAV = '[Layout] Close Right Side Nav';

  export class CloseRightSideNav implements Action {
    readonly type = CLOSE_RIGHT_SIDENAV;
  }

  export const TOGGLE_RIGHT_SIDENAV = '[Layout] Toggle Right Side Nav';

  export class ToggleRightSideNav implements Action {
    readonly type = TOGGLE_RIGHT_SIDENAV;
  }

  export const HIDE_SIDENAV_TOGGLE = '[Layout] Hide Side Nav Toggle';

  export class HideSideNavToggle implements Action {
    readonly type = HIDE_SIDENAV_TOGGLE;
  }

  export const CHANGE_THEME = '[Theme] Change Theme';

  export class ChangeTheme implements Action {
    readonly type = CHANGE_THEME;

    constructor(public readonly payload: { theme: Themes }) {
    }
  }

  export const SIDENAV_OPEN = '[Layout] Open sidenav';

  export class OpenSidenavAction implements Action {
    readonly type = SIDENAV_OPEN;
  }

  export const SIDENAV_CLOSE = '[Layout] Close sidenav';

  export class CloseSidenavAction implements Action {
    readonly type = SIDENAV_CLOSE;
  }

  export const SIDENAV_TOGGLE = '[Layout] Toggle sidenav';

  export class ToggleSidenavAction implements Action {
    readonly type = SIDENAV_TOGGLE;
  }

  export const SIDENAV_RIGHT_WIDGETS_CLOSE = '[Layout] Close Dashboard widgets';

  export class CloseDashBoardWidgets implements Action {
    readonly type = SIDENAV_RIGHT_WIDGETS_CLOSE;
  }

  export const SIDENAV_MINI = '[Layout] Toggle Mini sidenav';

  export class ToggleSidenavMini implements Action {
    readonly type = SIDENAV_MINI;
  }

  export const SIDENAV_MINI_ENABLE = '[Layout] Enable sidenav mini';

  export class EnableSidenavMini implements Action {
    readonly type = SIDENAV_MINI_ENABLE;
  }

  export const SIDENAV_MINI_DISABLE = '[Layout] Disable sidenav mini';

  export class DisableSidenavMini implements Action {
    readonly type = SIDENAV_MINI_DISABLE;
  }

  export const TOGGLE_ELEVATION = '[Layout] Toggle Elevation';

  export class ToggleElevation implements Action {
    readonly type = TOGGLE_ELEVATION;

    constructor(public payload: boolean) {
    }
  }

  export const TOGGLE_ELEVATION_SIZE = '[Layout] Toggle Elevation Size';

  export class ToggleElevationSize implements Action {
    readonly type = TOGGLE_ELEVATION_SIZE;

    constructor(public readonly payload: { elevationSize: ElevationSize }) {
    }
  }
}
