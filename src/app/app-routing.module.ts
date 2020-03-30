import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeedComponent} from "./feed/feed.component";

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) },
  { path: 'feed', component: FeedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
