import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SystemsService } from '../../views/services/api/systems.service';
import { TreeNode } from 'primeng/api';
import { SystemActions } from '../../state/actions/systems.actions';
import { AppStore } from '../../../core/state/app-store.interface';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-systems-tree',
  templateUrl: './systems-tree.component.html',
  styleUrls: ['./systems-tree.component.scss']
})
export class SystemsTreeComponent implements OnInit, OnChanges {

  structureTree: TreeNode[];
  treeExpanded = true;
  treeLoading;
  selectedNode: TreeNode;
  private unsubscribe$: Subject<void> = new Subject<void>();
  @Input() requestNodeSelect: boolean;
  @Input() refreshTopNodes: boolean;
  @Output() OnNodeSelect: EventEmitter<object> = new EventEmitter<object>();
  @Output() OnAddDomainNode: EventEmitter<boolean> = new EventEmitter<boolean>();
  tabs;
  cloudAccounts;


  constructor(private _systemsService: SystemsService,
              private store: Store<AppStore>) {
    this.tabs = [
      { name: 'structure', label: 'STRUCTURE' },
      { name: 'tags', label: 'TAGS' }
    ];
    const cloudAccounts = [];
    const a = JSON.parse(localStorage.getItem('cloudAccounts'));
    if (_.isNull(a)) {
      localStorage.setItem('cloudAccounts', JSON.stringify(cloudAccounts));
    }
    this.cloudAccounts = JSON.parse(localStorage.getItem('cloudAccounts'));
    if (this.cloudAccounts.length > 0) {
      for (let i = 0; i < this.cloudAccounts.length; i++) {
        this.getAccountCloudToken(this.cloudAccounts[i]);
      }
    }
  }

  getAccountCloudToken(account) {
    const payload = { 'grantType': 'password', 'userId': account.userid, 'password': account.userpassword, 'scope': 'myScope' };
    this._systemsService.getCloudToken(payload)
      .subscribe(data => {
        const a = JSON.parse(localStorage.getItem('cloudAccounts'));
        for (let i = 0; i < a.length; i++) {
          if (a[i].userid === account.userid) {
            a[i].token = data.access_token;
          }
        }
        localStorage.setItem('cloudAccounts', JSON.stringify(a));
      }, err => {
      });
  }

  getAccountCloudTokens() {
    this.cloudAccounts = JSON.parse(localStorage.getItem('cloudAccounts'));
    if (this.cloudAccounts.length > 0) {
      for (let i = 0; i < this.cloudAccounts.length; i++) {
        this.getAccountCloudToken(this.cloudAccounts[i]);
      }
    }
  }

  ngOnInit() {
    this.structureTree = [
      {
        'label': 'Domain Nodes',
        'data': 'treeTopNode',
        'expandedIcon': 'icon icon-network',
        'collapsedIcon': 'icon icon-network',
        'leaf': false,
        'children': []
      }
    ];
    this.loadDomainTree();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.refreshTopNodes);
    if (changes.refreshTopNodes.currentValue === true) {
      this.loadDomainTree();
      this.getAccountCloudTokens();
    }
  }

  runAddDomainNode() {
    this.OnAddDomainNode.emit(true);
  }

  loadDomainTree() {
    this.treeLoading = true;
    this.cloudAccounts = JSON.parse(localStorage.getItem('cloudAccounts'));
    this._systemsService.getDomainNodes()
      .subscribe(data => {
        this.treeLoading = false;
        this.structureTree[0].children = [];
        if (this.cloudAccounts.length > 0) {
          for (let j = 0; j < this.cloudAccounts.length; j++) {
            console.log(this.cloudAccounts[j].id);
            this.structureTree[0].children.push(
              {
                'label': this.cloudAccounts[j].id,
                'data': 'domainNode',
                'type': 'CLOUD',
                'expandedIcon': 'icon icon-cloud_queue',
                'collapsedIcon': 'icon icon-cloud_queue',
                'leaf': false,
                'children': []
              }
            );
          }
        }
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].domainNodeType === 'xmc server') {
              this.structureTree[0].children.push(
                {
                  'label': data[i].domainNodeId,
                  'data': 'domainNode',
                  'type': 'XMC',
                  'expandedIcon': 'icon icon-world',
                  'collapsedIcon': 'icon icon-world',
                  'leaf': false,
                  'children': []
                }
              );
            }
          }
        }
      }, err => {
        this.treeLoading = false;
      });
  }

  nodeExpanded(event) {
    console.log(event);
    if (event.node && event.node.data === 'domainNode' && event.node.type === 'CLOUD') {
      console.log('get cloud sites');
      event.node.children = [];
      this.cloudAccounts = JSON.parse(localStorage.getItem('cloudAccounts'));
      for (let j = 0; j < this.cloudAccounts.length; j++) {
        if (this.cloudAccounts[j].id === event.node.label) {
          this._systemsService.getCloudSites(this.cloudAccounts[j].token)
            .subscribe(data => {
              console.log('sites', data);
              for (let k = 0; k < data.length; k++) {
                event.node.children.push(
                  {
                    data: 'siteId:' + this.cloudAccounts[j].id + ':1',
                    children: [],
                    label: data[k].siteName,
                    leaf: true,
                    location: '/' + data[k].siteName,
                    type: 'CLOUD',
                    site: this.cloudAccounts[j].id,
                    id: data[k].id
                  }
                );
              }
            }, err => {
            });
        }
      }
    }

    if (event.node && event.node.data === 'domainNode' && event.node.type === 'XMC') {
      event.node.children = [];
      this._systemsService.getSitesDomainNode(event.node.label)
        .subscribe(data => {
          const a = JSON.stringify(data);
          const arr = JSON.parse(a, function(prop, value) {
            switch (prop) {
              case 'name':
                this.label = value;
                return;
              case 'rootNodeChildren':
                this.label = value;
                return;
              case 'siteIdKey':
                this.data = value;
                return;
              default:
                return value;
            }
          });
          event.node.children = [];
          console.log(arr);
          event.node.children.push(arr);
        }, err => {
        });
    }
    if (event.node && event.node.data === 'treeTopNode' && event.node.expanded === false) {
      // this.loadDomainTree();
    }
  }

  nodeSelect(event) {
    // console.log('Tree node selected', event);
    if (event.node.data === 'domainNode' || event.node.data === 'treeTopNode') {
      return;
    }
    if (this.requestNodeSelect) {
      this.OnNodeSelect.emit({ siteId: event.node.data, path: event.node.location });
    }

    if (event.node.type === undefined) {
      this.store.dispatch(new SystemActions.GetDevicesForSite({
        siteId: event.node.data,
        path: event.node.location,
        type: event.node.type
      }));
    }
    if (event.node.type === 'CLOUD') {
      console.log('FIRING');
      this.cloudAccounts = JSON.parse(localStorage.getItem('cloudAccounts'));
      for (let j = 0; j < this.cloudAccounts.length; j++) {
        if (this.cloudAccounts[j].id === event.node.site) {
          this.store.dispatch(new SystemActions.GetDevicesForSiteCloud({
            siteId: event.node.data,
            id: event.node.id,
            path: event.node.location,
            type: event.node.type,
            node: this.cloudAccounts[j].id,
            token: this.cloudAccounts[j].token
          }));
        }
      }

    }
  }

  nodeUnselect(event) {
    this.selectedNode = null;
  }

  toggleStructureCollapse() {
    this.treeExpanded = !this.treeExpanded;
  }
}

