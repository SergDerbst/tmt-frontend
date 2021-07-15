import {NgModule} from "@angular/core";
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
import {VideoDataService} from "./_services/video.data.service";
import {YoutubePlayer} from "./edit/player/youtube/youtube.player";
import {VideoRoutingModule} from "./video-routing.module";
import {TranscriptModule} from "../transcriptFM/transcript.module";
import {StoreModule} from "@ngrx/store";
import {videoReducer} from "./_store/video.reducer";
import {VideoPatchbay} from "./video.patchbay";
import {VideoContainer} from "./video.container";

@NgModule({
	declarations: [
		VideoContainer,
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
		VideoDataService,
		YoutubePlayer,
		VideoPatchbay
	]
})
export class VideoModule {}