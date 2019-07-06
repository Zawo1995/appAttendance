import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceProvider} from "../../service/service-http";
declare var BMap;
@Component({
  selector: 'app-create-class-detail',
  templateUrl: './create-class-detail.page.html',
  styleUrls: ['./create-class-detail.page.scss'],
})
export class CreateClassDetailPage implements OnInit {

  constructor(public activeRoute:ActivatedRoute,private http: HttpServiceProvider,public router: Router) { }
    data='';
    location:any;
    location1:any;
 async getLocation()
  {
    this.router.navigate(['/create-class'],{queryParams:{'location':this.location,'lng':this.location1.lng,'lat':this.location1.lat } });
  }
  ngOnInit() {

    var map = new BMap.Map("allmap");
    map.enableScrollWheelZoom(true);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      var point = new BMap.Point(r.point.lng,r.point.lat);
      map.centerAndZoom(point,12);
      // var params={
      //   latitude:r.point.lat ,
      //   longitude:r.point.lng
      // };
    })

    var geoc = new BMap.Geocoder();
    let  that= this
    map.addEventListener("click", function(e){
      that.location1=e.point;
      console.log(22,e.point)
      var pt = e.point;
      geoc.getLocation(pt, function(rs){
        var addComp = rs.addressComponents;
        that.location=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      });
    });

  }

}
