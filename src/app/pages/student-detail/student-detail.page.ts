import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpServiceProvider} from "../../service/service-http";

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {

  constructor(public activeRoute:ActivatedRoute,private http: HttpServiceProvider) { }
  data:any;

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams  => {
      this.data = queryParams;
      console.log(66,this.data.id)
      this.http.get('signDetail',{id:this.data.id}).then((d) => {
        console.log(6,d);
        this.data=d;
      }, e => {
        console.debug(e);
      });
    });
  }

}
