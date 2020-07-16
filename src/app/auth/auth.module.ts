import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {UtilsModule} from "../_utils/_utils.module";
import {AuthService} from "./auth.service";
import {AuthRouteGuard} from "./auth.route.guard";

@NgModule({
	imports: [
		AuthRoutingModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		CommonModule,
		UtilsModule
	],
	declarations: [
		LoginComponent,
		RegisterComponent
	],
	providers: [
		AuthService,
		AuthRouteGuard
	]
})
export class AuthModule {
}