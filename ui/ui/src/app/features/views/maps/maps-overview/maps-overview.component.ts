import { AfterViewInit, Component, ElementRef, HostListener, Renderer, Renderer2, ViewChild } from '@angular/core';
import { SystemsService } from '../../services/api/systems.service';
import { forkJoin } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-maps-overview',
  templateUrl: './maps-overview.component.html',
  styleUrls: ['./maps-overview.component.scss']
})
export class MapsOverviewComponent implements AfterViewInit {

  private centerLat: number;
  private centerLng: number;
  public zoom: number;
  public markers;
  domainNodeCalls;
  private changeLat: number;
  private changeLng: number;
  mapReady = false;
  icon_green;
  icon_red;
  openedWindow = 0; // alternative: array of numbers
  @ViewChild('AgmMap') agmMap: any;
  @ViewChild('wrapper') wrapper: ElementRef;

  @HostListener('window:resize')
  onWindowResize() {
    this.onResize();
  }

  constructor(private _renderer: Renderer2,
              private _systemsService: SystemsService
  ) {
    this.icon_green = './assets/images/icons/map_marker_green.png';
    this.icon_red = './assets/images/icons/map_marker_red.png';
    this.markers = [];
    this.zoom = 3;
    this._systemsService.getDomainNodes()
      .subscribe(data => {
        this.domainNodeCalls = [];
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].domainNodeType === 'xmc server') {
              // console.log('match', data[i].domainNodeId);
              this.domainNodeCalls.push(this._systemsService.getSitesDomainNode(data[i].domainNodeId));
            }
          }
        } else {
          this.mapReady = true;
          this.markers = [];
          this.aftermapReady();
        }
        this.loadStruct();
      }, err => {
      });
  }

  randomLatLong(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }

  loadStruct() {
    // console.log('calls', this.domainNodeCalls);
    forkJoin(...this.domainNodeCalls).subscribe(dataGroup => {
      // console.log(dataGroup);

      function randomLong(from, to, fixed) {
        return (Math.random() * 360 - 180).toFixed(8);
      }

      const usSeed = { latitude: 39.681826, longitude: -101.279512 };
      const asiaSeed = { latitude: 53.046167, longitude: 91.650779 };
      const africaSeed = { latitude: 4.349150, longitude: 21.163117 };

      function randomLat(center, radius) {
        const y0 = center.latitude;
        const x0 = center.longitude;
        const rd = radius / 111300;

        const u = Math.random();
        const v = Math.random();

        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);

        return {
          'lat': y + y0,
          'long': x + x0
        };
      }

      function randomLatLong(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      }

      const deviceCalls = [];
      const sites = [];
      const markers = [];
      const service = this._systemsService;
      let id = 1;
      const red = this.icon_red;

      _.cloneDeepWith(dataGroup, function(v) {
        if (v.chartData === null) {
          v.chartData = '';
        }
        if (!_.isUndefined(v.rootNodeChildren) && !_.isUndefined(v.siteIdKey) && !_.isUndefined(v.location)) {
          let mark;
          const domainNodeText = v.siteIdKey.match(/:([^']+):/)[1];
          if (id <= 30) {
            mark = randomLat(usSeed, 2222222);
          }
          if (id > 30 && id < 40) {
            mark = randomLat(africaSeed, 1999999);
          }
          if (id >= 40) {
            mark = randomLat(asiaSeed, 2222222);
          }
          deviceCalls.push(service.getSiteDevices(v.siteIdKey));
          sites.push(v.siteIdKey);
          markers.push({
            lat: mark.lat,
            long: mark.long,
            sitePath: v.location,
            siteKey: v.siteIdKey,
            siteName: v.rootNodeChildren,
            domainNode: domainNodeText,
            id: id++,
            icon: red,
            iconText: 0,
            threats: 0,
            endSystems: 0,
            alarms: 0,
            devices: [],
            deviceCount: 0
          });
        }
      });
      // console.log('result', markers);
      this.mapReady = true;
      this.loadDevices(deviceCalls, markers);
      // this.aftermapReady();
    });
  }

  loadDevices(calls, markers) {
    const green = this.icon_green;
    const red = this.icon_red;
    forkJoin(...calls).subscribe(dataGroup => {
      // yup its demo code
      _.forEach(dataGroup, function(devices) {
        // console.log(devices);
        _.forEach(markers, function(mark) {
          if (devices.length > 0) {
            if (mark.sitePath === devices[0].sitePath) {
              mark.deviceCount = devices.length;
              mark.devices = devices;
              mark.icon = green;
              mark.iconText = devices.length;
              mark.threats = Math.floor(Math.random() * 5);
              mark.endSystems = Math.floor(Math.random() * 150);
              mark.alarms = Math.floor(Math.random() * 5);
            }
          }
        });
      });
      this.markers = markers;
      // console.log(this.markers)
      this.aftermapReady();
    });
  }

  openWindow(id) {
    this.openedWindow = id; // alternative: push to array of numbers
  }

  isInfoWindowOpen(id) {
    return this.openedWindow === id; // alternative: check if id is in array
  }

  ngAfterViewInit() {

  }

  aftermapReady() {
    this._renderer.setStyle(
      this.wrapper.nativeElement, 'height',
      (window.innerHeight) + 'px'
    );
  }


  onResize() {
    // resize the container for the google map
    this._renderer.setStyle(
      this.wrapper.nativeElement, 'height',
      (window.innerHeight) + 'px'
    );

    // recenters the map to the resized area.
    this.agmMap.triggerResize().then(() =>
      this.agmMap._mapsWrapper.setCenter({ lat: this.centerLat, lng: this.centerLng }));
  }

  idle() {
    this.centerLat = this.changeLat;
    this.centerLng = this.changeLng;
  }

// this event fires whenever any event changes the center. Panning, zooming, or resizing.
  centerChange(event: any) {
    if (event) {
      this.changeLat = event.lat;
      this.changeLng = event.lng;
    }
  }

}

