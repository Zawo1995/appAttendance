import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {AlertController, MenuController, ToastController} from '@ionic/angular';
import {HttpServiceProvider} from "../../service/service-http";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginUser = {
        username: '',
        password: ''
    };
    LoginOk = true;
    submitOk = false;
    emailOk = true;
    passwordOk = true;

    constructor(private storage: LocalStorageService,
                private router: Router,
                private toastController: ToastController,
                private alterController: AlertController,
                private menuController:MenuController,
                private http: HttpServiceProvider) {
    }

    ngOnInit() {
        this.ionViewWillEnter();
    }
    ionViewWillEnter() {
        this.menuController.enable(false);
    }
    checkEmail(event) {
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let  Phonereg=/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
        if(Phonereg.test(this.loginUser.username))
        {
            this.emailOk = true;
            return
        }
        if (this.loginUser.username.length < 4 || this.loginUser.username.length > 30 || !reg.test(this.loginUser.username)) {
            this.emailOk = false;
            return
            return
        } else {
            this.emailOk = true;
            return
        }
    }

    checkPassword(event) {
        let reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
        if (this.loginUser.password.length < 6 || this.loginUser.password.length > 16 || !reg1.test(this.loginUser.password)) {
            this.passwordOk = false;
            console.log(this.loginUser.password);
        } else {
            console.log('uzi');
            this.passwordOk = true;
            if (this.emailOk === true) {
                this.submitOk = true;
            }
        }
    }

    async Login() {

        console.log(11);
       var params= {
           userName: this.loginUser.username,
           password: this.loginUser.password
       }
        this.http.post('loginout/login',params).then((d) => {
           console.log(d)
            this.storage.set("login",d.data);
           if(d.success){
               this.router.navigate(['/class']);
           }
           // else
           // {
           //     // let alert =  this.alterController.create({
           //     //     header: '提示',
           //     //     message: '用户名或者密码不正确',
           //     //     buttons: ['确定']
           //     // });
           //     //
           //     // alert.present();
           //
           // }
        }, e => {
            console.debug(e);
        });

        // 查看缓存中是否有这个用户
        // let UserMes: any = this.storage.get('UserMes', {
        //     phone: '',
        //     code: '',
        //     email: '',
        //     shopName: '',
        //     password: '',
        //     confirmPassword: ''
        // });
        // let someArray = this.storage.get('UserMes', '');
        // if (someArray.length > 0) {
        //     for (let i = 0; i < someArray.length; i++) {
        //         let flag1=someArray[i].email == this.loginUser.username && someArray[i].password == this.loginUser.password;
        //         let flag2= someArray[i].phone == this.loginUser.username && someArray[i].password == this.loginUser.password;
        //         console.log(flag1,"+",flag2,i);
        //         if (flag1||flag2) {
        //             this.router.navigateByUrl('class');
        //             someArray[i].loginTime = new Date().getTime();
        //             this.storage.set("LoginMes",someArray[i]);
        //             return;
        //         }
        //     }
        // }

        // this.LoginOk = false;
        // return;

    }
}
