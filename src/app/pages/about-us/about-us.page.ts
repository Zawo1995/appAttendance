import { Component, OnInit } from '@angular/core';
import {HttpServiceProvider} from "../../service/service-http";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor( private http: HttpServiceProvider,) { }

  ngOnInit() {
  var a = new Map();
   a.set("un","123");
   console.log(22,a);
    // this.http.post('login/checked',a ).then((d) => {
      //   console.log(d);
      //
      // }, e => {
      //   console.debug(e);
      // });
      let params = {};
          params["courseName"] = "工程";
      this.http.get('course',params).then((d) => {
          console.log(22,d);
      }, e => {
          console.debug(e);
      });
  }

}
