import { Component, OnInit } from '@angular/core';
import {HttpServiceProvider} from "../../service/service-http";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-opt-class',
  templateUrl: './opt-class.page.html',
  styleUrls: ['./opt-class.page.scss'],
})
export class OptClassPage implements OnInit {

  constructor(public router: Router,private http: HttpServiceProvider,private storage: LocalStorageService) {}
  courseName={}
  async  optClass(data) {

    this.http.get('course').then((d) => {
      console.log(6,d.data);
    }, e => {
      console.debug(e);
    });

  }

  async  addClass(data) {

   var params={
     studentId:this.storage.get("login",'').id,
     courseId:data.id
   }
    this.http.post('studentCourse',params).then((d) => {
      console.log(7,d);

    }, e => {
      console.debug(e);
    });

  }

  ngOnInit() {
    this.http.get('course').then((d) => {
      console.log(6,d.data);

      this.courseName = d.data;
    }, e => {
      console.debug(e);
    });
  }

}
