import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from "./contentFM/feedFM/feed.component";

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./authFM/auth.module').then(m => m.AuthModule) },
  { path: 'feed', component: FeedComponent },
  { path: 'content', loadChildren: () => import('./contentFM/content.module').then(m => m.ContentModule) },
  { path: 'global', loadChildren: () => import('./globalFM/global.module').then(m => m.GlobalModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
