import {NgModule} from "@angular/core";
import {TranscriptKeyActions} from "./transcript.key.actions";
import {TranscriptService} from "./transcript.service";
import {AuthModule} from "../../authFM/auth.module";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../../app.module";
import {HttpClient} from "@angular/common/http";
import {UtilsModule} from "../../_utils/_utils.module";
import {VideoRoutingModule} from "../videoFM/video-routing.module";
import {TranscriptComponent} from "./transcript.component";
import {ControlPanel} from "./controlPanel/control.panel";
import {TimestampControl} from "./controlPanel/timestamp/timestamp.control";
import {Controls} from "./controlPanel/controls/controls";
import {TextPanel} from "./textPanel/text.panel";
import {CommentPanel} from "./commentPanel/comment.panel";

@NgModule({
	declarations: [
		TranscriptComponent,
		ControlPanel,
		TimestampControl,
		Controls,
		TextPanel,
		CommentPanel,
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
		VideoRoutingModule,
	],
	exports: [
		TranscriptComponent
	],
	providers: [
		TranscriptKeyActions,
		TranscriptService,
	]
})
export class TranscriptModule {}