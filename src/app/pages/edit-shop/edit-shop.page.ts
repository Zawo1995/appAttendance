import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import {AlertController, ModalController, NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.page.html',
  styleUrls: ['./edit-shop.page.scss'],


})
export class EditShopPage implements OnInit {
title: string; //标题
property: string;
value: string;
shop: any;
submitOk = false;

  constructor(
      private activatedRoute: ActivatedRoute,
      private storage: LocalStorageService,
      private router: Router,
      private nav: NavController,
      private toastController: ToastController,
      private alterController: AlertController

  ) {
       this.property = activatedRoute.snapshot.queryParams.property;
       this.title = activatedRoute.snapshot.queryParams.title;
  }

  ngOnInit() {
      this.shop = this.storage.get('LoginMes', '');
  }
    async editShopMes(form: NgForm) {
      let UserMes = this.storage.get('LoginMes', '');
      if (this.value!=null&&this.value!="") {
          UserMes[this.property] = this.value;
          this.storage.set('LoginMes', UserMes);
          //this.router.navigate(['/shop']);
          let data: Object = { info: '返回的消息' };
          this.nav.navigateBack("/shop",);

      } else {
          let alert = await this.alterController.create({
              header: '提示',
              message: '请确认填写的信息不为空',
              buttons: ['确定']
          });
          alert.present();
        }
    }
}
