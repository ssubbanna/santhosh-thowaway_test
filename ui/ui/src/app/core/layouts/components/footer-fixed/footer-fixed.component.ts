import { Component, Input, OnInit } from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-footer-fixed',
  templateUrl: './footer-fixed.component.html',
  styleUrls: ['./footer-fixed.component.scss']
})
export class FooterFixedComponent implements OnInit {

  /**
   * Makes the footer transparent.
   */
  @Input() transparent: Boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
