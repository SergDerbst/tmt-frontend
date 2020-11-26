import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthRouteGuard} from "../../authFM/auth.route.guard";
import {AdminContainer} from "./admin.container";

const routes: Routes = [
	{ path: '', component: AdminContainer, canActivate: [AuthRouteGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}