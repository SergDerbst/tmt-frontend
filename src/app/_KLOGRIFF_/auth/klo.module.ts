import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KloRoutingModule} from './klo-routing.module';

import {UiModule} from '../_ui/_ui.module';
import {UtilsModule} from '../../_utils/_utils.module';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthenticationService} from "./_services/authentication.service";


@NgModule({
  imports: [
    CommonModule,
    KloRoutingModule,
    UiModule,
    UtilsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class KloModule {}
