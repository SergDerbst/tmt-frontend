import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VideoCreateComponent} from "../videoFM/create/video.create.component";
import {AuthRouteGuard} from "../../authFM/auth.route.guard";
import {VideoEditComponent} from "../videoFM/edit/video.edit.component";
import {VideoViewComponent} from "../videoFM/view/video.view.component";

const routes: Routes = [
	{ path: 'article/create', component: VideoCreateComponent, canActivate: [AuthRouteGuard] },
	{ path: 'article/:id/edit', component: VideoEditComponent, canActivate: [AuthRouteGuard] },
	{ path: 'article/:id', component: VideoViewComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArticleRoutingModule {}