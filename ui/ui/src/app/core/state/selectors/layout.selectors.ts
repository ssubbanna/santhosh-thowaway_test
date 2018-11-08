import { AppStore } from '../app-store.interface';

export const getShowSidenav = (state: AppStore) => state.layout.showSideNav;
export const getMiniSideNav = (state: AppStore) => state.layout.miniSideNav;
export const getShowSidenavUserToggled = (state: AppStore) => state.layout.userToggledSideNav;
export const getShowSidenavAutoToggled = (state: AppStore) => state.layout.autoToggledSidenav;

/* Is the right sideNav Open */
export const getRightSideNavState = (state: AppStore) => state.layout.showRightSidenav;
