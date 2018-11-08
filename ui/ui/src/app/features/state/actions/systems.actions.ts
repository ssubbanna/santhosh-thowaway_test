import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export namespace SystemActions {

  export const GET_DEVICES_FOR_SITE = '[SYSTEM] Get Associated devices for site';
  export const GET_DEVICES_FOR_SITE_RESET = '[SYSTEM] Reset Associated devices for site';
  export const GET_DEVICES_FOR_SITE_SUCCESS = '[SYSTEM] Get Associated devices for site => success';
  export const GET_DEVICES_FOR_SITE_ERROR = '[SYSTEM] Get Associated devices for site => error';
  // CLOUD
  export const GET_DEVICES_FOR_SITE_CLOUD = '[SYSTEM CLOUD] Get Associated devices for site';
  export const GET_DEVICES_FOR_SITE_RESET_CLOUD = '[SYSTEM CLOUD] Reset Associated devices for site';
  export const GET_DEVICES_FOR_SITE_SUCCESS_CLOUD = '[SYSTEM CLOUD] Get Associated devices for site => success';
  export const GET_DEVICES_FOR_SITE_ERROR_CLOUD = '[SYSTEM CLOUD] Get Associated devices for site => error';

  export class GetDevicesForSite implements Action {
    readonly type = GET_DEVICES_FOR_SITE;
    constructor(public payload: {siteId: string, path: string, type: string|undefined}) {
    }
  }

  export class GetDevicesForSiteSuccess implements Action {
    readonly type = GET_DEVICES_FOR_SITE_SUCCESS;

    constructor(public payload: { systems: any }) {
    }
  }

  export class GetDevicesForSiteError implements Action {
    readonly type = GET_DEVICES_FOR_SITE_ERROR;

    constructor(public payload: { error: HttpErrorResponse }) {
    }
  }

  export class GetDevicesForSiteReset implements Action {
    readonly type = GET_DEVICES_FOR_SITE_RESET;

    constructor() {
    }
  }

  // CLOUD
  export class GetDevicesForSiteCloud implements Action {
    readonly type = GET_DEVICES_FOR_SITE_CLOUD;
    constructor(public payload: {siteId: string, path: string, type: string|undefined, token: string, id: string, node: string}) {
    }
  }

  export class GetDevicesForSiteSuccessCloud implements Action {
    readonly type = GET_DEVICES_FOR_SITE_SUCCESS_CLOUD;

    constructor(public payload: { systems: any }) {
    }
  }

  export class GetDevicesForSiteErrorCloud implements Action {
    readonly type = GET_DEVICES_FOR_SITE_ERROR_CLOUD;

    constructor(public payload: { error: HttpErrorResponse }) {
    }
  }

  export class GetDevicesForSiteResetCloud implements Action {
    readonly type = GET_DEVICES_FOR_SITE_RESET_CLOUD;

    constructor() {
    }
  }

}
