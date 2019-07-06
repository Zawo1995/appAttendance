import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthenticationCodeService} from '../../service/authentication-code.service';
import {Md5} from 'ts-md5';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {AlertController, ToastController} from "@ionic/angular";
import {HttpServiceProvider} from "../../service/service-http";
/*import { HTTP } from '@ionic-native/http/ngx';*/

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    @ViewChild('signupSlides') signupSlides: any;
    slideIndex = 0;
    register = {
        phone: '',
        code: '',
        email: '',
        shopName: '',
        password: '',
        confirmPassword: ''
    };
    // 验证码倒计时
    verifyCode: any = {
        verifyCodeTips: '获取验证码',
        countdown: 60,
        disable: true
    };
    Createcode =  '';
    str = '';
    test = '测试测试';
    shopNameOk = true;
    emailOk = true;
    passwordOk = true;
    confirmPasswordOk = true;
    submit = false;
    constructor(
        private storage: LocalStorageService,
        private authcode: AuthenticationCodeService,
        private router: Router,
        private http: HttpServiceProvider,
        private alterController: AlertController
    ) {

    }
    ngOnInit() {

    }
    async onSlideDidChange(event) {
        // this.signupSlides.slideIndex = await
        // this.signupSlides.getActiveIndex();
        this.slideIndex = await this.signupSlides.getActiveIndex();
    }

// 15690697328

    async  sendCaptchaMessage() {
        var   params={
            telphone:this.register.phone,
        };
        this.http.post('register/sendCaptchaMessage',params).then((d) => {
            console.log(6,d);
        }, e => {
            console.debug(e);
        });

    }



    async  submitForm() {
       var   params={
            mobile:this.register.phone,

           password:this.register.password,
           confirm:this.register.confirmPassword,
           mail:this.register.email,
           captcha:this.register.code,
        };
        this.http.post('register/sendCaptchaMessage').then((d) => {
            console.log(6,d);

        }, e => {
            console.debug(e);
        });
        this.http.post('register/register',params).then((d) => {
            console.log(6,d.data);

        }, e => {
            console.debug(e);
        });
    }
//     generateVerifyCode(event) {
//         this.path = this.path + '?telNum=' + this.register.phone + '&verifyCode=';
//         this.str = this.authcode.createCode(4 , this.path);
//         // let getbool = {};
//       //   console.log(this.str);
// /*        */
//         // console.log(getbool);
//         this.Createcode = Md5.hashStr( this.str ).toLocaleString();
//         // console.log(this.verifyCode.verifyCodeTips);
//         this.verifyCode.disable = false;
//         this.settime();
// /*        if ( this.register.code !== this.Createcode ) {
//             console.log('not');
//         }*/
//     }

// 倒计时
    settime() {
        if (this.verifyCode.countdown === 1) {
            this.verifyCode.countdown = 60;
            this.verifyCode.verifyCodeTips = '获取验证码';
            this.verifyCode.disable = true;
            return;
        } else {
            this.verifyCode.countdown--;
        }

        this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
        setTimeout(() => {
            this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
            this.settime();
        }, 1000);
    }


    onInputMes(event) {
        let UserMes: any = {
            phone: '',
            code: '',
            email: '',
            shopName: '',
            password: '',
            confirmPassword: '',
            loginTime: 0,
            shopNickName: '',
            CreateTime : '',
            UserName : '',
            UserPhone : ''
            // IsLogined : false
        };
        if (  !this.shopNameOk || !this.emailOk || !this.passwordOk || !this.confirmPasswordOk ) {
            //    console.log('not ok');
        } else {
            UserMes.phone = this.register.phone;
            UserMes.code = this.register.code;
            UserMes.email = this.register.email;
            UserMes.shopName = this.register.shopName;
            UserMes.password = this.register.password;
            UserMes.confirmPassword = this.register.confirmPassword;
            UserMes.CreateTime = new Date().toDateString();
            var someArray= [];
            someArray = this.storage.get('UserMes', []);
            for (let i=0;i<someArray.length;++i)
            {
                if (UserMes.phone==someArray[i].phone||UserMes.email==someArray[i].email)
                {
                    this.onRegister();
                    return;
                }
            }
            someArray.push(UserMes);
            console.log(someArray);
            this.storage.set('UserMes', someArray);

        }
    }
    async onRegister() {
        let alert = await this.alterController.create({
            header: '提示',
            subHeader: 'subHeader',
            message: '手机号或者邮箱已经被注册',
            buttons: ['确定']
        });
        alert.present();
    }

    checkShopName(event) {
        if (this.register.shopName.length > 8 || this.register.shopName.length === 0) {
            this.shopNameOk = false;
        } else {
            this.shopNameOk = true;
        }
    }

    checkEmail(event) {
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        console.log(reg.test(this.register.email));
        if (this.register.email.length < 4 || this.register.email.length > 30 || !reg.test(this.register.email)) {
            this.emailOk = false;
        } else {
            this.emailOk = true;
        }
    }

    checkPassword(event) {
        let reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
        if (this.register.password.length < 6 || this.register.password.length > 16 || !reg1.test(this.register.password)) {
            this.passwordOk = false;
            console.log('778');
        } else {
            console.log('uzi');
            this.passwordOk = true;
        }
    }

    checkConfirmPassword(event) {
        let reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
        if (this.register.confirmPassword.length < 6 || this.register.confirmPassword.length > 16  || !reg1.test(this.register.password)
            || this.register.confirmPassword !== this.register.password) {
            this.confirmPasswordOk = false;
        } else {
            this.confirmPasswordOk = true;
        }
    }
    GoToLogin(event) {
        this.router.navigateByUrl('login');
    }

}
