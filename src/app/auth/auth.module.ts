import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../_KLOGRIFF_/_ui/_ui.module";
import {HttpClient} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {PersonalDataComponent} from "./register/personalData/personal.data.component";
import {UtilsModule} from "../_utils/_utils.module";
import {CredentialsComponent} from "./register/credentials/credentials.component";

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
		RegisterComponent,
		PersonalDataComponent,
		CredentialsComponent
	],
	providers: []
})
export class AuthModule {

}