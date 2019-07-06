import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpServiceProvider} from "../../service/service-http";
import {LocalStorageService} from "../../services/local-storage.service";
declare var BMap;
@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.page.html',
  styleUrls: ['./class-detail.page.scss'],
})
export class ClassDetailPage implements OnInit {

  constructor(public activeRoute:ActivatedRoute,private http: HttpServiceProvider,private storage: LocalStorageService ) { }
  data:any;
student={};
  isSgin:any;
  async  sign() {
    var myDate = new Date();
    var map = new BMap.Map("map");
    var pois=new Array();

    var param={
      courseId:this.data.id
    };
    this.http.get('sign/getSignId',param).then((d) => {
      console.log(33,d);
      var geolocation = new BMap.Geolocation();
      let  that= this;
       geolocation.getCurrentPosition(function(r){
         console.log(r.point)
         pois.push(r.point);
         console.log(12, map.getDistance(pois[0],new BMap.Point(d[0].longitude, d[0].latitude)));
       var params={
         signId:d[0].signId,
         studentId:that.storage.get("login",'').id ,
         latitude:r.point.lat ,
         longitude:r.point.lng
       };
         that.http.post('signDetail',params).then((d) => {
         console.log(d)
       }, e => {
         console.debug(e);
       });
    });
    }, e => {
      console.debug(e);
    });

    }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams  => {
      this.data = queryParams;
      console.log(28,this.data);
      var params={
        courseId:this.data.id
      };
      this.http.get('sign/getSignId',params).then((d) => {
        console.log(33,d);
        if(d.length==0)
        {
          this.isSgin=0;
        }
        else
        {
          this.isSgin=1;
        }
        this.http.get('signDetail',{id:d[0].signId}).then((d) => {
            console.log(14,d);
            this.student=d;
        }, e => {
          console.debug(e);
        });

      }, e => {
        console.debug(e);
      });
    });
  }

}
