import { LayoutActions } from '../actions/layout.actions';
import { ElevationSize, ILayout, layoutFactory, Themes } from '../interfaces/layout.interface';

export namespace LayoutReducer {
  type ALL
    = LayoutActions.ChangeTheme
    | LayoutActions.OpenSidenavAction
    | LayoutActions.ToggleElevation
    | LayoutActions.ToggleElevationSize
    | LayoutActions.CloseSidenavAction
    | LayoutActions.ToggleSidenavMini
    | LayoutActions.EnableSidenavMini
    | LayoutActions.DisableSidenavMini
    | LayoutActions.ToggleSidenavAction
    | LayoutActions.CloseDashBoardWidgets
    | LayoutActions.ShowUserControls
    | LayoutActions.HideUserControls
    | LayoutActions.ShowSideNavToggle
    | LayoutActions.ShowRightSideNav
    | LayoutActions.ToggleRightSideNav
    | LayoutActions.CloseRightSideNav
    | LayoutActions.HideSideNavToggle;

  export function reducer(state = layoutFactory(), action: ALL): ILayout {
    switch (action.type) {
      case LayoutActions.SHOW_USER_CONTROLS: {
        return showUserControls(state);
      }
      case LayoutActions.HIDE_USER_CONTROLS: {
        return hideUserControls(state);
      }
      case LayoutActions.SHOW_SIDENAV_TOGGLE: {
        return showSideNavToggle(state);
      }
      case LayoutActions.SHOW_RIGHT_SIDENAV: {
        return showRightSideNav(state);
      }
      case LayoutActions.CLOSE_RIGHT_SIDENAV: {
        return closeRightSideNav(state);
      }
      case LayoutActions.TOGGLE_RIGHT_SIDENAV: {
        return toggleRightSideNav(state);
      }
      case LayoutActions.HIDE_SIDENAV_TOGGLE: {
        return hideSideNavToggle(state);
      }
      case LayoutActions.CHANGE_THEME: {
        return changeTheme(state, action.payload);
      }
      case LayoutActions.SIDENAV_CLOSE: {
        return closeSideNav(state);
      }
      case LayoutActions.SIDENAV_OPEN: {
        return openSideNav(state);
      }
      case LayoutActions.SIDENAV_TOGGLE: {
        return toggleSideNav(state);
      }
      case LayoutActions.SIDENAV_RIGHT_WIDGETS_CLOSE: {
        return closeRightSideNavWidgets(state);
      }
      case LayoutActions.SIDENAV_MINI: {
        return toggleSideNavMini(state);
      }
      case LayoutActions.SIDENAV_MINI_ENABLE: {
        return enableSideNavMini(state);
      }
      case LayoutActions.SIDENAV_MINI_DISABLE: {
        return disableSideNavMini(state);
      }
      case LayoutActions.TOGGLE_ELEVATION: {
        return toggleElevation(state);
      }
      case LayoutActions.TOGGLE_ELEVATION_SIZE: {
        return toggleElevationSize(state, action.payload);
      }
      default:
        return state;
    }
  }

  function changeTheme(layout: ILayout, payload: { theme: Themes }): ILayout {
    return {
      ...layout,
      theme: payload.theme
    };
  }

  function showUserControls(layout: ILayout) {
    return {
      ...layout,
      showUserControls: true
    };
  }

  function hideUserControls(layout: ILayout) {
    return {
      ...layout,
      showUserControls: false
    };
  }

  function showSideNavToggle(layout: ILayout) {
    return {
      ...layout,
      showHeaderSideNavToggle: true
    };
  }

  function showRightSideNav(layout: ILayout) {
    return {
      ...layout,
      showRightSidenav: true
    };
  }

  function closeRightSideNav(layout: ILayout) {
    return {
      ...layout,
      showRightSidenav: false
    };
  }

  function toggleRightSideNav(layout: ILayout) {
    return {
      ...layout,
      showRightSidenav: !layout.showRightSidenav
    };
  }

  function hideSideNavToggle(layout: ILayout) {
    return {
      ...layout,
      showHeaderSideNavToggle: false
    };
  }

  function closeSideNav(layout: ILayout) {
    return {
      ...layout,
      showSideNav: false
    };
  }

  function openSideNav(layout: ILayout) {
    return {
      ...layout,
      showSideNav: true
    };
  }

  function toggleSideNav(layout: ILayout) {
    return {
      ...layout,
      showSideNav: !layout.showSideNav
    };
  }

  function closeRightSideNavWidgets(layout: ILayout) {
    return {
      ...layout,
      showWidgetsSideNav: false
    };
  }

  function toggleSideNavMini(layout: ILayout) {
    return {
      ...layout,
      miniSideNav: !layout.miniSideNav
    };
  }

  function enableSideNavMini(layout: ILayout) {
    return {
      ...layout,
      miniSideNav: true
    };
  }

  function disableSideNavMini(layout: ILayout) {
    return {
      ...layout,
      miniSideNav: false
    };
  }

  function toggleElevation(layout: ILayout) {
    return {
      ...layout,
      elevation: !layout.elevation
    };
  }

  function toggleElevationSize(layout: ILayout, payload: { elevationSize: ElevationSize }): ILayout {
    return {
      ...layout,
      elevationSize: payload.elevationSize
    };
  }
}
