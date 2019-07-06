import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpServiceProvider} from "../../service/service-http";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";
declare var BMap;
@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.page.html',
  styleUrls: ['./create-class.page.scss'],
})
export class CreateClassPage implements OnInit {

  constructor(public activeRoute:ActivatedRoute,public router: Router,private http: HttpServiceProvider,private storage: LocalStorageService) { }

  ngOnInit()
  {
    this.activeRoute.queryParams.subscribe(queryParams  => {
      this.data = queryParams;
      this.location=this.data.location;
      console.log(14,this.data);
    });
  }
  location='';
  data:any;
  courseName='';
  startWeek='';
  endWeek='';
  startTime='';
  row='';
  column='';
  startClass='';
  endClass='';
  dayNum='';
  async map() {
    this.router.navigate(['/create-class-detail']);
  }

  async addCourse(form: NgForm) {
      var id = null;
      var  params ={
       courseName:this.courseName,
       startWeek:this.startWeek,
       endWeek:this.endWeek,
       teacherId:this.storage.get("login",'').id,
       courseOpenTime:this.startTime
     };
     this.http.post('course',params).then((d) => {
       console.log(33,d.success);
       this.http.get('course',params).then((d) => {
         console.log(33,d.data[0].id);
         var  params1 ={
           courseId:d.data[0].id,
           courseAddress:this.data.location,
           longitude:this.data.lng,
           latitude:this.data.lat,
           setRow:this.row,
           setColumn:this.column,
           lessonBegin:this.startClass,
           lessonLength:this.endClass,
           dayNum:this.dayNum
       };
         this.http.post('arrange',params1).then((d) => {
           console.log(44,d);
         }, e => {
           console.debug(e);
         });
       }, e => {
         console.debug(e);
       });
    }, e => {
      console.debug(e);
    });

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      var params={
        latitude:r.point.lat ,
        longitude:r.point.lng
      };
      var myGeo = new BMap.Geocoder();
      // 根据坐标得到地址描述
      myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){
        if (result){
          console.log(result.address);
        }
      });
    })


  }

}
