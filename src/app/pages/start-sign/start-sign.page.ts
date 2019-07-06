import { Component, OnInit } from '@angular/core';
import {HttpServiceProvider} from "../../service/service-http";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-start-sign',
  templateUrl: './start-sign.page.html',
  styleUrls: ['./start-sign.page.scss'],
})
export class StartSignPage implements OnInit {

  constructor(public activeRoute:ActivatedRoute,private http: HttpServiceProvider,public router: Router ,private storage: LocalStorageService) { };

    data:any;
    sign:any;
     isSign=0;
     arrangeId=null;
  async  startSign() {
      this.isSign=1;
      var params={
         arrangeId:this.arrangeId,
          teacherId:this.storage.get("login",'').id,
          stuNum:60,
          stuNumIn:59
      }
      this.http.post('sign',params).then((d) => {
        console.log(d);
      }, e => {
        console.debug(e);
      });
  }

    async  endSign() {
        this.isSign=0;
        var params={
            arrangeId:this.arrangeId,
            teacherId:this.storage.get("login",'').id
        };

        this.http.get('sign',params).then((d) => {
            console.log(66,d.data.length);

            this.http.post('sign/update',{id:d.data[d.data.length-1].id}).then((d) => {
            }, e => {
                console.debug(e);
            });

        }, e => {
            console.debug(e);
        });
    }

      async  go(data) {
          this.router.navigate(['/student-detail'],{queryParams:{id:data.id}});
      }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe(queryParams  => {
            this.data = queryParams;
            console.log(22,this.data)
            this.http.get('arrange',{courseId:this.data.id}).then((d) => {
                console.log(5,d);
                this.arrangeId=d.result[0].id;
                this.http.get('sign',{arrangeId:d.result[0].id}).then((d) => {
                    console.log(6,d.data);
                    this.sign=d.data;
                }, e => {
                    console.debug(e);
                });
            }, e => {
                console.debug(e);
            });
            console.log(28,this.data);
        });
  }

}
