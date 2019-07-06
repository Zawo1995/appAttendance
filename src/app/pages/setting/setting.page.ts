import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(
      private activatedRoute: ActivatedRoute,
      private storage: LocalStorageService,
      private router: Router,
      private menuController:MenuController
  ) { }

  ngOnInit() {
      this.ionViewDidLeave();
  }
    ionViewDidLeave() {
        this.menuController.enable(true);
    }
    onCall(phoneNumber) {
      //  console.log(phoneNumber);
        window.location.href = 'tel:' + phoneNumber;
    }
   onLogout() {
       let UserMes = this.storage.get('UserMes', '');
       UserMes.loginTime = 0; // 把时间放到很久之前
       this.storage.set('UserMes', UserMes);
       this.router.navigateByUrl('login');
    }
}
