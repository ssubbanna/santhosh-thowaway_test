import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'lodash';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { AppStore } from '../../../../core/state/app-store.interface';
import { SystemsService } from '../../services/api/systems.service';
import { DialogService } from '../../../../shared/dialogs/dialogs.service';
import { SystemActions } from '../../../state/actions/systems.actions';
import { AddNodeDialogComponent } from '../../../components/dialogs/addNodeDialog/add-node-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';


export interface SystemGridElement {
  deviceName: string;
  ip: string;
  sitePath: string;
}

const SYSTEMS_GRID_DATA: SystemGridElement[] = [];

@Component({
  selector: 'app-systems-overview',
  templateUrl: './systems-overview.component.html',
  styleUrls: ['./systems-overview.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class SystemsOverviewComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['deviceName', 'ip', 'sitePath', 'firmware'];
  tableColumns = [
    { columnDef: 'deviceName', header: 'NAME', cell: 'deviceName' },
    { columnDef: 'ip', header: 'IP ADDRESS', cell: 'ip' },
    { columnDef: 'sitePath', header: 'PATH', cell: 'sitePath' },
    { columnDef: 'firmware', header: 'FIRMWARE', cell: 'firmware' }
  ];
  // cell: (element: SystemGridElement) => `${element.sitePath}`
  dataSource = new MatTableDataSource<SystemGridElement>();
  expandedElement: SystemGridElement;
  private unsubscribe$: Subject<void> = new Subject<void>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  systems;
  isLoading = false;
  tabs;
  activeTab;
  imageToShow: any;
  demoData;
  expandLoading;
  cloudAccounts;
  public refreshDomainTree: boolean;


  constructor(private matDialog: MatDialog,
              private store: Store<AppStore>,
              private _systemsService: SystemsService,
              private _dialogService: DialogService) {

    this.tabs = [
      { name: 'devices', label: 'DEVICES' },
      { name: 'endpoints', label: 'ENDPOINTS' }
    ];
    this.imageToShow = null;
    this.activeTab = this.tabs[0].name;
    this.store.dispatch(new SystemActions.GetDevicesForSiteReset());
  }

  // Tmp for demo
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.loadSystemsGrid();
    this.dataSource.paginator = this.paginator;
  }

  loadSystemsGrid() {
    this.store.pipe(select(state => state), takeUntil(this.unsubscribe$))
      .subscribe((systems: any) => {
        console.log(systems);
        if (systems.SystemsModule.systems.loading) {
          this.isLoading = true;
          this.dataSource.data = [...[]];
        }
        if (systems.SystemsModule.systems.error) {
          this.isLoading = false;
        }
        if (systems.SystemsModule.systems.successful === true) {
          this.systems = systems.SystemsModule.systems.payload;
          if (systems.SystemsModule.systems.type === 'XMC') {
            this.dataSource.data = [...this.systems];
            this.dataSource.paginator = this.paginator;
            this.isLoading = false;
          }
          if (systems.SystemsModule.systems.type === 'CLOUD') {
            const calls = [];
            this.cloudAccounts = JSON.parse(localStorage.getItem('cloudAccounts'));
            for (let j = 0; j < this.cloudAccounts.length; j++) {
              if (this.cloudAccounts[j].id === systems.SystemsModule.systems.node) {
                console.log('this one ', systems.SystemsModule.systems.payload)
                calls.push(this._systemsService.getCloudSiteSwitches(this.cloudAccounts[j].token),
                  this._systemsService.getCloudSiteAps(systems.SystemsModule.systems.payload.siteName, this.cloudAccounts[j].token)
                );
              }
            }
            forkJoin(...calls).subscribe(dataGroup => {
              const displayed = [];
              const switches = dataGroup[0];
              const aps = dataGroup[1];
              for (let j = 0; j < switches.length; j++) {
                if (switches[j].hostSite === systems.SystemsModule.systems.payload.siteName) {
                  displayed.push(switches[j]);
                }
              }
              for (let j = 0; j < aps.length; j++) {
                  displayed.push(aps[j]);
              }
              const a = JSON.stringify(displayed);
              const arr = JSON.parse(a, function(prop, value) {
                switch (prop) {
                  case 'apName':
                    this.deviceName = value;
                    return;
                  case 'ipAddress':
                    this.ip = value;
                    return;
                  case 'softwareVersion':
                    this.firmware = value;
                    return;
                  case 'hostSite':
                    this.sitePath = '/' + value;
                    return;
                  case 'hardwareType':
                    this.deviceDisplayFamily = value;
                    return;
                  case 'switchType':
                    this.deviceDisplayFamily = value;
                    return;
                  case 'mgmtIpAddress':
                    this.ip = value;
                    return;
                  case 'systemName':
                    this.deviceName = value;
                    return;
                  default:
                    return value;
                }
              });
              this.dataSource.data = [...arr];
              this.dataSource.paginator = this.paginator;
              this.isLoading = false;
            });
          }
        }
      });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  rowExpanded(item) {
    console.log('item', item)
    if (item.deviceDisplayFamily === 'AP3935i-FCC') {
      this.imageToShow = './assets/images/products/3935.png';
      return;
    }
    if (item.deviceDisplayFamily === 'X440G2-48t-10G4') {
      this.imageToShow = './assets/images/products/x440G2-48t.png';
      return;
    }
    if (item.deviceDisplayFamily === '220-48p-10GE4') {
      this.imageToShow = './assets/images/products/200-48.png';
      return;
    }
    if (item.deviceDisplayFamily === 'X440G2-24p-10G4') {
      this.imageToShow = './assets/images/products/440-G2-24.png';
      return;
    }
    if (item.deviceDisplayFamily === 'AP-7562-670042-WR') {
      this.imageToShow = './assets/images/products/7562.png';
      return;
    }
    if (item.deviceDisplayFamily === 'AP3965i-FCC' || item.deviceDisplayFamily === 'AP3965i-ROW') {
      this.imageToShow = './assets/images/products/3965.png';
      return;
    }
    if (item.hasOwnProperty('igmpEnabled')) {
      this.imageToShow = null;
      return;
    }
    if (item.hasOwnProperty('baseService')) {
      this.imageToShow = null;
      return;
    }
    this.expandLoading = true;
    this._systemsService.getDeviceImage(item.imageurl)
      .subscribe(data => {
        this.createImageFromBlob(data);
        this.expandLoading = false;
      }, err => {
        this.expandLoading = false;
      });
  }


  /**
   *  Add a domain Node
   */
  addDomainNode() {
    this.refreshDomainTree = false;
    const dialogRef = this.matDialog.open(AddNodeDialogComponent, {
      position: { top: '80px' },
      backdropClass: 'main-backdrop',
      width: '700px',
      hasBackdrop: true,
      autoFocus: true,
      data: ''
    });
    this._dialogService.addDialog({ id: dialogRef.id, callingComponent: 'MessageDialogComponent', ref: dialogRef });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshDomainTree = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}

