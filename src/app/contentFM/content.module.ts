import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {httpTranslateLoader} from "../app.module";
import {AuthModule} from "../authFM/auth.module";
import {UtilsModule} from "../_utils/_utils.module";
import {VideoModule} from "./videoFM/video.module";
import {AudioModule} from "./audioFM/audio.module";
import {ArticleModule} from "./articleFM/article.module";

@NgModule({
	declarations: [],
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
		UtilsModule,
		AudioModule,
		VideoModule,
		ArticleModule,
	],
	providers: []
})
export class ContentModule {}