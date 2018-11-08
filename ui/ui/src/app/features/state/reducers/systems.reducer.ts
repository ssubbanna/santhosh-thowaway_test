import { SystemActions } from '../actions/systems.actions';
import { ISystemCalls, systemsFactory } from '../interfaces/systems.interface';

export namespace SystemsReducer {
  type ALL
    = SystemActions.GetDevicesForSite
    | SystemActions.GetDevicesForSiteSuccess
    | SystemActions.GetDevicesForSiteError
    | SystemActions.GetDevicesForSiteReset
    | SystemActions.GetDevicesForSiteCloud
    | SystemActions.GetDevicesForSiteSuccessCloud
    | SystemActions.GetDevicesForSiteErrorCloud
    | SystemActions.GetDevicesForSiteResetCloud;

  export function reducer(state = systemsFactory(), action: ALL): ISystemCalls {
    switch (action.type) {
      case SystemActions.GET_DEVICES_FOR_SITE: {
        return getSystems(state, action.payload);
      }
      case SystemActions.GET_DEVICES_FOR_SITE_SUCCESS: {
        return getSystemsSuccess(state, action.payload);
      }
      case SystemActions.GET_DEVICES_FOR_SITE_ERROR: {
        return getSystemsError(state, action.payload);
      }
      case SystemActions.GET_DEVICES_FOR_SITE_RESET: {
        return getSystemsReset(state);
      }
      case SystemActions.GET_DEVICES_FOR_SITE_CLOUD: {
        return getSystemsCloud(state, action.payload);
      }
      case SystemActions.GET_DEVICES_FOR_SITE_SUCCESS_CLOUD: {
        return getSystemsSuccessCloud(state, action.payload);
      }
      case SystemActions.GET_DEVICES_FOR_SITE_ERROR_CLOUD: {
        return getSystemsErrorCloud(state, action.payload);
      }
      case SystemActions.GET_DEVICES_FOR_SITE_RESET_CLOUD: {
        return getSystemsResetCloud(state);
      }
      default:
        return state;
    }
  }

  function getSystems(systems, payload) {
    // console.log(systems)
    return {
      ...systems,
      loading: true,
      error: null,
      payload: null,
      successful: false,
      create: false,
      siteId: payload.siteId,
      path: payload.path,
      type: 'XMC'
    };
  }

  function getSystemsSuccess(systems, payload) {
    return {
      ...systems,
      loading: false,
      payload: payload.systems,
      error: null,
      successful: true,
      create: false,
      type: 'XMC'
    };
  }

  function getSystemsError(systems, payload) {
    return {
      ...systems,
      loading: false,
      payload: null,
      error: payload.error,
      successful: false,
      create: false,
      type: 'XMC'
    };
  }

  function getSystemsReset(systems) {
    return {
      ...systems,
      loading: undefined,
      payload: undefined,
      error: undefined,
      successful: false,
      create: false,
      type: undefined
    };
  }

  // Cloud
  function getSystemsCloud(systems, payload) {
    // console.log(systems)
    return {
      ...systems,
      loading: true,
      error: null,
      payload: null,
      successful: false,
      create: false,
      siteId: payload.siteId,
      path: payload.path,
      node: payload.node,
      type: 'CLOUD'
    };
  }

  function getSystemsSuccessCloud(systems, payload) {
    return {
      ...systems,
      loading: false,
      payload: payload.systems,
      error: null,
      successful: true,
      create: false,
      type: 'CLOUD'
    };
  }

  function getSystemsErrorCloud(systems, payload) {
    return {
      ...systems,
      loading: false,
      payload: null,
      error: payload.error,
      successful: false,
      create: false,
      type: 'CLOUD'
    };
  }

  function getSystemsResetCloud(systems) {
    return {
      ...systems,
      loading: undefined,
      payload: undefined,
      error: undefined,
      successful: false,
      create: false,
      type: undefined
    };
  }

}
