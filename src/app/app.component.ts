import { Component } from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from './services/local-storage.service';
import {HomePage} from './home/home.page';
import {Router} from '@angular/router';


@Component ({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        { title: '店铺设置', url: 'setting', icon: 'chatboxes' },
        { title: '店铺信息', url: 'shop', icon: 'create' },
        { title: '修改密码', url: 'changePwd', icon: 'git-merge' },
        { title: '资金账户', url: 'home', icon: 'cash' },
        { title: '反馈建议', url: 'home', icon: 'cash' },
        { title: '关于我们', url: 'aboutUs', icon: 'cash' },
    ];
   rootPage: any = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar

  ) {

    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
