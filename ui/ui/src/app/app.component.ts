import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  constructor(public overlayContainer: OverlayContainer) {
  }


  ngOnInit() {
    this.componentCssClass = 'app-theme-default';
    this.overlayContainer.getContainerElement().classList.add('app-theme-default');
  }

}
