import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {UtilsModule} from "../_utils/_utils.module";
import {httpTranslateLoader} from "../app.module";
import {AuthService} from "./auth.service";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthRouteGuard} from "./auth.route.guard";

export function tokenGetter() {
	return localStorage.getItem('tmt_access_token');
}

@NgModule({
	imports: [
		AuthRoutingModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: ['arsch.morz'],
			}
		}),
		ReactiveFormsModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoader,
				deps: [HttpClient]
			}
		}),
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