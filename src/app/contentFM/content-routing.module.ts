import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./adminFM/admin.module').then(m => m.AdminModule) },
  { path: 'audio', loadChildren: () => import('./audioFM/audio.module').then(m => m.AudioModule) },
  { path: 'article', loadChildren: () => import('./articleFM/article.module').then(m => m.ArticleModule) },
  { path: 'video', loadChildren: () => import('./videoFM/video.module').then(m => m.VideoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
