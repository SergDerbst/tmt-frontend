import {NgModule} from "@angular/core";
import {VideoCreateComponent} from "./create/video.create.component";
import {VideoEditComponent} from "./edit/video.edit.component";
import {VideoViewComponent} from "./view/video.view.component";
import {VideoHeaderComponent} from "./edit/header/video.header.component";
import {VideoPlayerComponent} from "./edit/player/video.player.component";
import {VideoMetadataComponent} from "./edit/metadata/video.metadata.component";
import {TranscriptComponent} from "../transcript/transcript.component";
import {AuthModule} from "../../auth/auth.module";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../../app.module";
import {HttpClient} from "@angular/common/http";
import {UtilsModule} from "../../_utils/_utils.module";
import {VideoRoutingModule} from "./video-routing.module";
import {YoutubePlayerComponent} from "./edit/player/youtube/youtube.player.component";
import {TimestampControl} from "../transcript/controlPanel/timestamp/timestamp.control";
import {Controls} from "../transcript/controlPanel/controls/controls";
import {TextPanel} from "../transcript/textPanel/text.panel";
import {ControlPanel} from "../transcript/controlPanel/control.panel";
import {CommentPanel} from "../transcript/commentPanel/comment.panel";
import {YoutubePlayer} from "./edit/player/youtube/youtube.player";
import {TranscriptService} from "../transcript/transcript.service";

@NgModule({
	declarations: [
		VideoCreateComponent,
		VideoEditComponent,
			VideoHeaderComponent,
			VideoPlayerComponent,
				YoutubePlayerComponent,
			VideoMetadataComponent,
			TranscriptComponent,
				ControlPanel,
					TimestampControl,
					Controls,
				TextPanel,
				CommentPanel,
			VideoViewComponent,
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
	providers: [
		TranscriptService,
		YoutubePlayer,
	]
})
export class VideoModule {}