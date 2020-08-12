import {NgModule} from "@angular/core";
import {GlobalComponent} from "./global.component";
import {GlobalMessageComponent} from "./message/global.message.component";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {GlobalRoutingModule} from "./global-routing.module";
import {EmailVerificationMessageComponent} from "./message/emailVerification/email.verification.message.component";

@NgModule({
	declarations: [
		EmailVerificationMessageComponent,
		GlobalComponent,
		GlobalMessageComponent
	],
	imports: [
		CommonModule,
		GlobalRoutingModule,
		FontAwesomeModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoader,
				deps: [HttpClient]
			}
		})
	],
	exports: [
		EmailVerificationMessageComponent
	]
})
export class GlobalModule {}