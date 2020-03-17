import {NgModule} from "@angular/core";
import {ArticleEditComponent} from "./edit/article.edit.component";
import {ArticleRoutingModule} from "./article-routing.module";

@NgModule({
 imports: [
 	  ArticleRoutingModule
 ],
	declarations: [
		ArticleEditComponent
	]
})
export class ArticleModule {}