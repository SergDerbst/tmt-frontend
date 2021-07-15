import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VideoCreateComponent} from "./create/video.create.component";
import {AuthRouteGuard} from "../../authFM/auth.route.guard";
import {VideoEditComponent} from "./edit/video.edit.component";
import {VideoViewComponent} from "./view/video.view.component";
import {VideoContainer} from "./video.container";

const routes: Routes = [
	{ path: '', component: VideoContainer, canActivate: [AuthRouteGuard] },
	{ path: 'create', component: VideoCreateComponent, canActivate: [AuthRouteGuard] },
	{ path: ':videoId/edit', component: VideoEditComponent, canActivate: [AuthRouteGuard] },
	{ path: ':videoId', component: VideoViewComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VideoRoutingModule {}