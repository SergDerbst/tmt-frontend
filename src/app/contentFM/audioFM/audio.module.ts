import {NgModule} from "@angular/core";
import {AuthModule} from "../../authFM/auth.module";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../../app.module";
import {HttpClient} from "@angular/common/http";
import {UtilsModule} from "../../_utils/_utils.module";
import {AudioRoutingModule} from "./audio-routing.module";
import {TranscriptKeyActions} from "../transcriptFM/transcript.key.actions";
import {TranscriptService} from "../transcriptFM/transcript.service";
import {AudioCreateComponent} from "./create/audio.create.component";
import {AudioEditComponent} from "./edit/audio.edit.component";
import {AudioViewComponent} from "./view/audio.view.component";
import {TranscriptModule} from "../transcriptFM/transcript.module";

@NgModule({
	declarations: [
		AudioCreateComponent,
		AudioEditComponent,
		AudioViewComponent,
	],
	imports: [
		AuthModule,
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoader,
				deps: [HttpClient]
			}
		}),
		FormsModule,
		UtilsModule,
		TranscriptModule,
		AudioRoutingModule,
	],
	providers: [
	]
})
export class AudioModule {}