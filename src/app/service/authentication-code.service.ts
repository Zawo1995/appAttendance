import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import {HttpClient} from '@angular/common/http';
/*import { SMSClient } from '@alicloud/sms-sdk';*/

@Injectable({
  providedIn: 'root'
})

export class AuthenticationCodeService {
    // 用于保存验证码
    private code: string;
    // 存放验证码的过期时间
    private deadline: number;
    constructor(private http: HttpClient) {
    }
    createCode(count: number , path: string): string {
        this.code = '';
       // console.log('create Code');
        // 10分钟内有效
        this.deadline = Date.now() + 60 * 10 * 1000;
        for ( let i = 0; i < count; i++) {
            let num = Math.floor(Math.random() * 10);
            this.code += num.toString();
        }
        path = path + this.code;
     //   console.log(path);
        /*如果需要的话，打开注释就可以发短信了*/
/*        this.http.get(path).subscribe(data => {
            console.log(data);
        });*/
        return this.code;
    }

/*    validate(value: string): boolean {
        let now = Date.now();
        return value === this.code && now < this.deadline;
    }*/
}
