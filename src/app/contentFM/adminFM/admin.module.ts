import {NgModule} from "@angular/core";
import {ContentAdminComponent} from "./admin/content.admin.component";
import {ContentFilterComponent} from "./admin/filter/content.filter.component";
import {Searchbox} from "./admin/filter/searchbox/searchbox";
import {AuthModule} from "../../authFM/auth.module";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../../app.module";
import {HttpClient} from "@angular/common/http";
import {UtilsModule} from "../../_utils/_utils.module";
import {TranscriptModule} from "../transcriptFM/transcript.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminContainer} from "./admin.container";
import {AdminPatchbay} from "./admin.patchbay";
import {adminReducer} from "./_store/admin.reducer";

@NgModule({
	declarations: [
		AdminContainer,
		ContentAdminComponent,
		ContentFilterComponent,
		Searchbox
	],
	imports: [
		AuthModule,
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		StoreModule.forFeature('admin', adminReducer),
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
		AdminRoutingModule
	],
	providers: [
		AdminPatchbay
	]
})
export class AdminModule {}
