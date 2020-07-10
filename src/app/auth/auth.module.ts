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

@NgModule({
	imports: [
		AuthRoutingModule,
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
	providers: []
})
export class AuthModule {
}