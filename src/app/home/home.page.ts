import {Component, OnInit} from '@angular/core';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
constructor( private menuController:MenuController) {
   // console.log('homepage  de constructor');
}
    ngOnInit() {
        this.ionViewDidLeave();

    }
    ionViewDidLeave() {
        this.menuController.enable(true);
    }
    public sales = [
        {
            title : '今日',
            content : '比昨日',
            current : 689,
            previous : 123
        },
        {
            title : '七日',
            content : '比昨日',
            current : 689,
            previous : 689
        },
        {
            title : '本月',
            content : '比昨日',
            current : 69,
            previous : 123
        }
    ];
    minus(current: number, previous: number): number {
        const result = current - previous;
        if (result > 0) {
            return 1;
        } else if (result === 0) {
            return 0;
        } else {
            return -1;
        }
    }
}
