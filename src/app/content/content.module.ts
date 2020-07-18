import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {ContentComponent} from './content.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {ContentFilterComponent} from "./filter/content.filter.component";
import {Searchbox} from "./filter/searchbox/searchbox";
import {ContentArticleEditComponent} from "./article/content.article.edit.component";
import {ContentArticleViewComponent} from "./article/content.article.view.component";
import {ContentPodcastEditComponent} from "./podcast/content.podcast.edit.component";
import {ContentPodcastViewComponent} from "./podcast/content.podcast.view.component";
import {VideoEditComponent} from "./video/edit/video.edit.component";
import {VideoViewComponent} from "./video/view/video.view.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VideoCreateComponent} from "./video/create/video.create.component";
import {ContentArticleCreateComponent} from "./article/content.article.create.component";
import {ContentPodcastCreateComponent} from "./podcast/content.podcast.create.component";
import {httpTranslateLoader} from "../app.module";
import {AuthModule} from "../auth/auth.module";
import {VideoService} from "./video/video.service";
import {VideoHeaderComponent} from "./video/edit/header/video.header.component";
import {VideoMetadataComponent} from "./video/edit/metadata/video.metadata.component";
import {UtilsModule} from "../_utils/_utils.module";
import {VideoTranscriptComponent} from "./video/edit/transcript/video.transcript.component";
import {VideoPlayerComponent} from "./video/edit/player/video.player.component";


@NgModule({
	declarations: [
		ContentComponent,
		ContentFilterComponent,
		ContentArticleCreateComponent,
		ContentArticleEditComponent,
		ContentArticleViewComponent,
		ContentPodcastCreateComponent,
		ContentPodcastEditComponent,
		ContentPodcastViewComponent,
		VideoCreateComponent,
		VideoEditComponent,
		VideoViewComponent,
		VideoHeaderComponent,
		VideoPlayerComponent,
		VideoMetadataComponent,
		VideoTranscriptComponent,
		Searchbox
	],
	imports: [
		AuthModule,
		CommonModule,
		ContentRoutingModule,
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
		UtilsModule
	],
	providers: [
		VideoService
	]
})
export class ContentModule {}