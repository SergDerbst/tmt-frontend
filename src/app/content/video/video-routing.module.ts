import {RouterModule, Routes} from "@angular/router";
import {AuthRouteGuard} from "../../auth/auth.route.guard";
import {VideoCreateComponent} from "./create/video.create.component";
import {VideoEditComponent} from "./edit/video.edit.component";
import {VideoViewComponent} from "./view/video.view.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
	{ path: 'video/create', component: VideoCreateComponent, canActivate: [AuthRouteGuard] },
	{ path: 'video/:id/edit', component: VideoEditComponent, canActivate: [AuthRouteGuard] },
	{ path: 'video/:id', component: VideoViewComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VideoRoutingModule {}