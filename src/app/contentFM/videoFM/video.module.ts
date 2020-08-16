import {NgModule} from "@angular/core";
import {TranscriptComponent} from "../transcriptFM/transcript.component";
import {ControlPanel} from "../transcriptFM/controlPanel/control.panel";
import {TimestampControl} from "../transcriptFM/controlPanel/timestamp/timestamp.control";
import {Controls} from "../transcriptFM/controlPanel/controls/controls";
import {TextPanel} from "../transcriptFM/textPanel/text.panel";
import {CommentPanel} from "../transcriptFM/commentPanel/comment.panel";
import {VideoCreateComponent} from "./create/video.create.component";
import {VideoEditComponent} from "./edit/video.edit.component";
import {VideoHeaderComponent} from "./edit/header/video.header.component";
import {VideoPlayerComponent} from "./edit/player/video.player.component";
import {YoutubePlayerComponent} from "./edit/player/youtube/youtube.player.component";
import {VideoMetadataComponent} from "./edit/metadata/video.metadata.component";
import {VideoViewComponent} from "./view/video.view.component";
import {AuthModule} from "../../authFM/auth.module";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../../app.module";
import {HttpClient} from "@angular/common/http";
import {UtilsModule} from "../../_utils/_utils.module";
import {VideoService} from "./video.service";
import {YoutubePlayer} from "./edit/player/youtube/youtube.player";
import {VideoRoutingModule} from "./video-routing.module";
import {TranscriptModule} from "../transcriptFM/transcript.module";
import {StoreModule} from "@ngrx/store";
import {videoReducer} from "./_store/video.reducer";
import {EffectsModule} from "@ngrx/effects";
import {VideoEffects} from "./_store/video.effects";

@NgModule({
	declarations: [
		VideoCreateComponent,
		VideoEditComponent,
			VideoHeaderComponent,
			VideoPlayerComponent,
				YoutubePlayerComponent,
			VideoMetadataComponent,
		VideoViewComponent,
	],
	imports: [
		AuthModule,
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		StoreModule.forFeature('video', videoReducer),
		EffectsModule.forFeature([
			VideoEffects
		]),
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
		VideoRoutingModule,
	],
	providers: [
		VideoService,
		YoutubePlayer
	]
})
export class VideoModule {}