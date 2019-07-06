import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.page.html',
  styleUrls: ['./change-pwd.page.scss'],
})
export class ChangePwdPage implements OnInit {
    constructor(
        private storage: LocalStorageService,
        private toastController: ToastController,
        private alterController: AlertController,
        private router: Router
    ) { }
    loginUser = {
        OldPwd: '',
        NewPwd: '',
        SecNewPwd: ''
    };
  ngOnInit() {
  }
    async  ChangePwd(event) {
      let content = '';
      let input = 1;
      if (this.loginUser.SecNewPwd === '' || this.loginUser.NewPwd === '' || this.loginUser.OldPwd === '' ) {
          content = '密码格式输入错误';
          input = 0;
      } else {
          let UserMes = this.storage.get('UserMes', '');
          if (UserMes.password === this.loginUser.OldPwd) {
              if (this.loginUser.NewPwd === this.loginUser.SecNewPwd) {
                  UserMes.password = this.loginUser.NewPwd;
                  UserMes.confirmPasswordOk = this.loginUser.SecNewPwd;
                  this.storage.set('UserMes', UserMes);
                  input = 1;
                  content = '修改密码成功！';
              } else {
                  input = 0;
                  content = '请保证输入密码和确认密码一致！';
              }
          } else {
              input = 0;
              content = '原密码输入错误！';
          }
      }

      console.log(this.loginUser.OldPwd);
      if (input === 1) {
          let alert = await   this.alterController.create({
              header: '提示',
              // subHeader: '修改',
              message: content,
              buttons: ['确定']
          });
          alert.present();
          this.router.navigateByUrl('setting');
      } else {
          let alert = await  this.alterController.create({
              header: '提示',
              // subHeader: '修改',
              message: content,
              buttons: ['确定']
          });
          alert.present();
          this.router.navigateByUrl('changePwd');
      }
    }
}
