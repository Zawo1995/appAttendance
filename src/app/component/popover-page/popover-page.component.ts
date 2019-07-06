import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-popover-page',
  templateUrl: './popover-page.component.html',
  styleUrls: ['./popover-page.component.scss'],
})
export class PopoverPageComponent implements OnInit {

  constructor(public router: Router) { }
  createClass()
  {
    this.router.navigate(['/create-class']);
  }
  optClass()
  {
    this.router.navigate(['/opt-class']);
  }
  ngOnInit() {}

}
