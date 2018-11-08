import { ActionReducerMap } from '@ngrx/store';
import { AppStore } from './app-store.interface';
import { LayoutReducer } from './reducers/layout.reducer';

export const reducers: ActionReducerMap<AppStore> = {
  layout: LayoutReducer.reducer
};
