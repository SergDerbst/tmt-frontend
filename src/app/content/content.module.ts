import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { httpTranslateLoader } from "../_ui/_ui.module";
import { ContentFilterComponent } from "./filter/content.filter.component";
import { Searchbox } from "./filter/searchbox/searchbox";
import {ContentArticleEditComponent} from "./article/content.article.edit.component";
import {ContentArticleViewComponent} from "./article/content.article.view.component";
import {ContentPodcastEditComponent} from "./podcast/content.podcast.edit.component";
import {ContentPodcastViewComponent} from "./podcast/content.podcast.view.component";
import {ContentVideoEditComponent} from "./video/content.video.edit.component";
import {ContentVideoViewComponent} from "./video/content.video.view.component";


@NgModule({
  declarations: [
  	ContentComponent,
	  ContentFilterComponent,
	  ContentArticleEditComponent,
	  ContentArticleViewComponent,
	  ContentPodcastEditComponent,
	  ContentPodcastViewComponent,
	  ContentVideoEditComponent,
	  ContentVideoViewComponent,
	  Searchbox
  ],
	imports: [
		CommonModule,
		ContentRoutingModule,
		FontAwesomeModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoader,
				deps: [HttpClient]
			}
		})
	]
})
export class ContentModule {}