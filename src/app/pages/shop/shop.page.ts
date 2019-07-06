///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {MenuController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
    shop: any;
  constructor(
      private storage: LocalStorageService, private menuController:MenuController,
  ) {

  }
  ngOnInit() {
      this.shop = this.storage.get('LoginMes', '');
      this.ionViewDidLeave();
      console.log("shop","被执行");
  }
    ionViewDidLeave() {
        this.menuController.enable(true);
    }
}
