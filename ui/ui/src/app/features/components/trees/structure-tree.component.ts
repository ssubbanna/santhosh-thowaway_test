import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SystemsService } from '../../views/services/api/systems.service';
import { TreeNode } from 'primeng/api';
import { SystemActions } from '../../state/actions/systems.actions';
import { AppStore } from '../../../core/state/app-store.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-structure-tree',
  templateUrl: './structure-tree.component.html',
  styleUrls: ['./structure-tree.component.scss']
})
export class StructureTreeComponent implements OnInit {

  structureTree: TreeNode[];
  treeExpanded = true;
  treeLoading;
  selectedNode: TreeNode;
  @Input() requestNodeSelect: boolean;
  @Input() expandableDomainNodes: boolean;
  @Output() OnNodeSelect: EventEmitter<object> = new EventEmitter<object>();
  @Input() requestChartData: boolean;
  @Output() OnNodeSelectChartData: EventEmitter<object> = new EventEmitter<object>();

  constructor(private _systemsService: SystemsService) {
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

  loadDomainTree() {
    this.treeLoading = true;
    this._systemsService.getDomainNodes()
      .subscribe(data => {
        this.treeLoading = false;
        this.structureTree[0].children = [];
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].domainNodeType === 'xmc server') {
              this.structureTree[0].children.push(
                {
                  'label': data[i].domainNodeId,
                  'data': 'domainNode',
                  'expandedIcon': 'icon icon-world',
                  'collapsedIcon': 'icon icon-world',
                  'leaf': !this.expandableDomainNodes,
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
    if (event.node && event.node.data === 'domainNode') {
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
    if (event.node.data === 'domainNode' && this.requestChartData) {
      this._systemsService.getSitesDomainNode(event.node.label)
        .subscribe(data => {
          this.OnNodeSelectChartData.emit({ siteId: event.node.label, path: event.node.data, chartData: data.chartData });
        }, err => {
        });
    }
    if (event.node.data === 'domainNode' || event.node.data === 'treeTopNode') {
      return;
    }
    if (this.requestNodeSelect) {
      this.OnNodeSelect.emit({ siteId: event.node.data, path: event.node.location });
    }
  }

  nodeUnselect(event) {
    this.selectedNode = null;
  }

  toggleStructureCollapse() {
    this.treeExpanded = !this.treeExpanded;
  }
}

