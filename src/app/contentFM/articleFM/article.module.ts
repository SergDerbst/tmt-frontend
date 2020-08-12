import {NgModule} from "@angular/core";
import {ArticleCreateComponent} from "./create/article.create.component";
import {ArticleEditComponent} from "./edit/article.edit.component";
import {ArticleViewComponent} from "./view/article.view.component";
import {AuthModule} from "../../authFM/auth.module";
import {CommonModule} from "@angular/common";
import {ContentRoutingModule} from "../content-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../../app.module";
import {HttpClient} from "@angular/common/http";
import {UtilsModule} from "../../_utils/_utils.module";
import {ArticleRoutingModule} from "./article-routing.module";

@NgModule({
	declarations: [
		ArticleCreateComponent,
		ArticleEditComponent,
		ArticleViewComponent,
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
		UtilsModule,
		ArticleRoutingModule,
	],
	providers: [
	
	]
})
export class ArticleModule {}