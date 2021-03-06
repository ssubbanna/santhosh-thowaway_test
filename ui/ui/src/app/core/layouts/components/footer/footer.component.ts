import { Component, Input, OnInit } from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  /**
   * Makes the footer transparent.
   */
  @Input() transparent: Boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
