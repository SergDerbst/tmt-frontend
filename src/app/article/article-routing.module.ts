import {ArticleEditComponent} from "./edit/article.edit.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

const routes = [
	{ path: 'write', component: ArticleEditComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]})
export class ArticleRoutingModule {}