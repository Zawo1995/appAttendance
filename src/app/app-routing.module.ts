import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 原来是home
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'forgetPassword', loadChildren: './pages/forget-password/forget-password.module#ForgetPasswordPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'shop', loadChildren: './pages/shop/shop.module#ShopPageModule' },
  { path: 'edit-shop', loadChildren: './pages/edit-shop/edit-shop.module#EditShopPageModule' },
  { path: 'aboutUs', loadChildren: './pages/about-us/about-us.module#AboutUsPageModule' },
  { path: 'changePwd', loadChildren: './pages/change-pwd/change-pwd.module#ChangePwdPageModule' },
  { path: 'class', loadChildren: './pages/class/class.module#ClassPageModule' },
  { path: 'class-detail', loadChildren: './pages/class-detail/class-detail.module#ClassDetailPageModule' },
  { path: 'create-class', loadChildren: './pages/create-class/create-class.module#CreateClassPageModule' },
  { path: 'create-class-detail', loadChildren: './pages/create-class-detail/create-class-detail.module#CreateClassDetailPageModule' },
  { path: 'start-sign', loadChildren: './pages/start-sign/start-sign.module#StartSignPageModule' },
  { path: 'student-detail', loadChildren: './pages/student-detail/student-detail.module#StudentDetailPageModule' },
  { path: 'opt-class', loadChildren: './pages/opt-class/opt-class.module#OptClassPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
