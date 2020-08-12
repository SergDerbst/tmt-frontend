import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VideoCreateComponent} from "../videoFM/create/video.create.component";
import {AuthRouteGuard} from "../../authFM/auth.route.guard";
import {VideoEditComponent} from "../videoFM/edit/video.edit.component";
import {VideoViewComponent} from "../videoFM/view/video.view.component";

const routes: Routes = [
	{ path: 'audio/create', component: VideoCreateComponent, canActivate: [AuthRouteGuard] },
	{ path: 'audio/:id/edit', component: VideoEditComponent, canActivate: [AuthRouteGuard] },
	{ path: 'audio/:id', component: VideoViewComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AudioRoutingModule {}