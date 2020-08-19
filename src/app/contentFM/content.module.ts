import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {ContentFilterComponent} from "./admin/filter/content.filter.component";
import {Searchbox} from "./admin/filter/searchbox/searchbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {httpTranslateLoader} from "../app.module";
import {AuthModule} from "../authFM/auth.module";
import {UtilsModule} from "../_utils/_utils.module";
import {VideoModule} from "./videoFM/video.module";
import {AudioModule} from "./audioFM/audio.module";
import {ArticleModule} from "./articleFM/article.module";
import {StoreModule} from "@ngrx/store";
import {contentReducer} from "./_store/content.reducer";
import {ContentAdminComponent} from "./admin/content.admin.component";
import {ContentJunctionBox} from "./_junction/content.junction.box";

@NgModule({
	declarations: [
		ContentAdminComponent,
		ContentFilterComponent,
		Searchbox,
	],
	imports: [
		AuthModule,
		CommonModule,
		ContentRoutingModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		StoreModule.forFeature('content', contentReducer),
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
	providers: [
		ContentJunctionBox
	]
})
export class ContentModule {}