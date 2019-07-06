import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import {AuthenticationCodeService} from '../../service/authentication-code.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Md5} from 'ts-md5';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
    @ViewChild('FgPwdSlides') signupSlides: any;
  constructor(
      private storage: LocalStorageService,
      private authcode: AuthenticationCodeService,
      private router: Router,
      private http: HttpClient,
      private menuController:MenuController
  ) { }
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
    ChangeOk = false;
    passwordOk = true;
    confirmPasswordOk = true;
    submitCode = true;
    path = 'http://172.17.170.176/SendMes/demo/sendSms.php';
  ngOnInit() {
       this.signupSlides.lockSwipeToNext(true);
       this.ionViewWillEnter();
  }
    ionViewWillEnter() {
        this.menuController.enable(false);
    }
    async onSlideDidChange(event) {
        this.slideIndex = await this.signupSlides.getActiveIndex();
    }
    next() {
        this.signupSlides.lockSwipeToNext(false);
        this.signupSlides.slideNext();
        this.signupSlides.lockSwipeToNext(true);
    }
    previous() {
        this.signupSlides.slidePrev();
    }
    goLastStep(event) {
        this.previous();
    }
    onInputPhone(form: NgForm) {
       // console.log(form);
       // console.log(form.valid);
        if ( form.valid === true) {
            this.next();
        }
    }
    onInputCode(event) {
        if ( Md5.hashStr(this.register.code) !== this.Createcode ) {
            this.submitCode = false;
            // let pwd = Md5.hashStr(this.register.code).toString();
            console.log(Md5.hashStr(this.register.code).toString());
        } else {
            this.next();
        }
    }
    generateVerifyCode(event) {
        this.path = this.path + '?telNum=' + this.register.phone + '&verifyCode=';
        this.str = this.authcode.createCode(4 , this.path);
        // let getbool = {};
        //   console.log(this.str);
        /*        */
        // console.log(getbool);
        this.Createcode = Md5.hashStr( this.str ).toLocaleString();
        // console.log(this.verifyCode.verifyCodeTips);
        this.verifyCode.disable = false;
        this.settime();
        /*        if ( this.register.code !== this.Createcode ) {
                    console.log('not');
                }*/
    }

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
    onInputMes(form1: NgForm) {
        if ( !this.passwordOk || !this.confirmPasswordOk || this.register.password !== this.register.confirmPassword) {
            this.confirmPasswordOk = false;
        } else {
            let UserMes = this.storage.get('UserMes', '');
                if ( UserMes.phone === this.register.phone ) {
                    UserMes.password = this.register.password;
                    UserMes.confirmPassword = this.register.confirmPassword;
                    this.ChangeOk = true;
                }
                // this.router.navigateByUrl('home')
            if (this.ChangeOk === true) {
                this.storage.set('UserMes', UserMes);
                this.next();
            } else {
               this.ChangeOk = false;
            }
        }
    }
    checkPassword(event) {
        let reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
        if (this.register.password.length < 6 || this.register.password.length > 16 || !reg1.test(this.register.password)) {
            this.passwordOk = false;
          //  console.log('778');
        } else {
         //   console.log('uzi');
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
}
