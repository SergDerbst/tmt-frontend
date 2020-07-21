import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import {ContentArticleEditComponent} from "./article/content.article.edit.component";
import {ContentArticleViewComponent} from "./article/content.article.view.component";
import {ContentPodcastEditComponent} from "./podcast/content.podcast.edit.component";
import {ContentPodcastViewComponent} from "./podcast/content.podcast.view.component";
import {ContentArticleCreateComponent} from "./article/content.article.create.component";
import {ContentPodcastCreateComponent} from "./podcast/content.podcast.create.component";
import {AuthRouteGuard} from "../auth/auth.route.guard";

const routes: Routes = [
  { path: '', component: ContentComponent, canActivate: [AuthRouteGuard] },
  { path: 'article/create', component: ContentArticleCreateComponent, canActivate: [AuthRouteGuard] },
  { path: 'article/:id/edit', component: ContentArticleEditComponent, canActivate: [AuthRouteGuard] },
  { path: 'article/:id', component: ContentArticleViewComponent },
  { path: 'podcast/create', component: ContentPodcastCreateComponent, canActivate: [AuthRouteGuard] },
  { path: 'podcast/:id/edit', component: ContentPodcastEditComponent, canActivate: [AuthRouteGuard] },
  { path: 'podcast/:id', component: ContentPodcastViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
