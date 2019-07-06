import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {Router} from "@angular/router";
import {HttpServiceProvider} from "../../service/service-http";
import {PopoverPageComponent} from "../../component/popover-page/popover-page.component";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {



  constructor(public popoverController: PopoverController,public router: Router,private http: HttpServiceProvider,private storage: LocalStorageService) {}

  async  go(data) {
    this.router.navigate(['/start-sign'],{queryParams:{'courseName':data.courseName,'id':data.id}});
  }
  async  go1(data) {
    this.router.navigate(['/class-detail'],{queryParams:{'courseName':data.courseName,'id':data.id}});
  }
  async presentPopover(ev: any) {
    console.log(1,ev);
    const popover = await this.popoverController.create({
      component: PopoverPageComponent,
      event: ev,
      translucent: true
    });
    return await popover.present()
  }

  courseName={}
  courseName1={}
  ngOnInit() {

    let params = {
      teacherId:this.storage.get("login",'').id
    };
    this.http.get('course',params).then((d) => {
      for(var i in d.data )
        this.courseName = d.data;
      console.log(33,this.courseName);
    }, e => {
      console.debug(e);
    });
    let params1 = {
      studentId:this.storage.get("login",'').id
    };
    this.http.get('studentCourse',params1).then((d) => {
      console.log(79,d.data)
      this.http.get('course',{id:d.data[0].courseId}).then((d) => {
           console.log(56,d);
        this.courseName1 = d.data;
      }, e => {
        console.debug(e);
      });

    }, e => {
      console.debug(e);
    });
  }

}
