import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../core/state/app-store.interface';
import { WindowRef } from '../../../../shared/utils/windowRef';

@Injectable()
export class SystemsService implements OnDestroy {

  private readonly HOST;

  constructor(private http: HttpClient,
              private store: Store<AppStore>,
              private _window: WindowRef) {
    if (!env.production) {
      this.HOST = env.appSettings.api.protocol +
        env.appSettings.api.host + ':' +
        env.appSettings.api.port + env.appSettings.api.restUri;
    }
    if (env.production) {
      this.HOST = env.appSettings.api.protocol +
        `${this._window.nativeWindow.location.hostname}:` +
        env.appSettings.api.port + env.appSettings.api.restUri;
    }
  }

  // Add an Domain Node
  addDomainNode(payload): Observable<any> {
    return this.http
      .post(this.HOST + 'domainNode', payload);
  }

  // get Domain Nodes
  getDomainNodes(): Observable<any> {
    return this.http
      .get(this.HOST + 'domainNode/all');
  }

  // get Domain Node Specifics
  getSitesDomainNode(hostId): Observable<any> {
    return this.http
      .get(this.HOST + 'sitesInDomainNode/' + hostId);
  }

  // get devices Specifics
  getSiteDevices(siteId): Observable<any> {
    return this.http
      .get(this.HOST + 'devicesInSite/' + siteId);
  }

  getDeviceImage(url): Observable<Blob> {
    return this.http
      .get(this.HOST + 'image?imageurl=' + url, {
        responseType: 'blob'
      });
  }

  getCloudToken(payload): Observable<any> {
    return this.http
      .post('https://api.test.online.extremenetworks.com/management/v1/oauth2/token', payload);
  }

  getCloudSites(auth_token): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth_token
      }
    );
    return this.http
      .get('https://api.test.online.extremenetworks.com/management/v3/sites', {headers: headers});
  }

  getCloudSite(site, auth_token): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth_token
      }
    );
    return this.http
      .get('https://api.test.online.extremenetworks.com/management/v3/sites/' + site, {headers: headers});
  }
  getCloudSiteAps(site, auth_token): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth_token
      }
    );
    return this.http
      .get('https://api.test.online.extremenetworks.com/management/v1/aps?filter=hostSite+eq+' + site + '&orderBy=serialNumber',
        {headers: headers});
  }
  getCloudSiteSwitches(auth_token): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth_token
      }
    );
    return this.http
      .get('https://api.test.online.extremenetworks.com/management/v1/switches',
        {headers: headers});
  }

  ngOnDestroy() {

  }
}
