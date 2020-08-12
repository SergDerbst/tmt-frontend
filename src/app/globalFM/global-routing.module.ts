import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GlobalMessageComponent} from "./message/global.message.component";

const routes: Routes = [
	{ path: 'message/:type/:id', component: GlobalMessageComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GlobalRoutingModule {}