import { Injectable } from '@angular/core';
import {Register} from '../class/register';
import {AjaxResult} from '../class/ajax-result';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
/*  async signup(register: Register): AjaxResult {
      return new Promise((resolve, reject) => {
          resolve();
      });
  }*/
    signup(register: Register): boolean {
    let user = {
        phone: register.phone,
        shopName: register.shopName,
        accounts: []
    };
    user.accounts[0] = {identifier: register.phone, passwordToken: register.password};
    user.accounts[1] = {identifier: register.phone, passwordToken: register.password};
        return true;
    }

}
