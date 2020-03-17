import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';

import {UiModule} from '../_ui/_ui.module';
import {UtilsModule} from '../_utils/_utils.module';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuardService} from "./_services/auth.guard.service";


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    UiModule,
    UtilsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthGuardService
  ]
})
export class AuthModule {}
