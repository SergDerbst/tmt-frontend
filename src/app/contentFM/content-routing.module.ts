import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import {AuthRouteGuard} from "../authFM/auth.route.guard";

const routes: Routes = [
  { path: '', component: ContentComponent, canActivate: [AuthRouteGuard] },
  { path: 'audio', loadChildren: () => import('./audioFM/audio.module').then(m => m.AudioModule) },
  { path: 'article', loadChildren: () => import('./articleFM/article.module').then(m => m.ArticleModule) },
  { path: 'video', loadChildren: () => import('./videoFM/video.module').then(m => m.VideoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
