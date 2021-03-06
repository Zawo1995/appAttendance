import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {LocalStorageService} from './services/local-storage.service';
import {HttpClientModule} from '@angular/common/http';
import {PopoverPageComponent} from "./component/popover-page/popover-page.component";
import {BarComponent} from "./component/bar/bar.component";
@NgModule({
  declarations: [AppComponent,PopoverPageComponent,BarComponent],
  entryComponents: [PopoverPageComponent,BarComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
