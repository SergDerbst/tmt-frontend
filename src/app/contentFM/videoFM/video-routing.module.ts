import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VideoCreateComponent} from "./create/video.create.component";
import {AuthRouteGuard} from "../../authFM/auth.route.guard";
import {VideoEditComponent} from "./edit/video.edit.component";
import {VideoViewComponent} from "./view/video.view.component";

const routes: Routes = [
	{ path: 'video/create', component: VideoCreateComponent, canActivate: [AuthRouteGuard] },
	{ path: 'video/:id/edit', component: VideoEditComponent, canActivate: [AuthRouteGuard] },
	{ path: 'video/:id', component: VideoViewComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VideoRoutingModule {}