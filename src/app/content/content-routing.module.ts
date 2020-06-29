import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import {ContentArticleEditComponent} from "./article/content.article.edit.component";
import {ContentArticleViewComponent} from "./article/content.article.view.component";
import {ContentPodcastEditComponent} from "./podcast/content.podcast.edit.component";
import {ContentPodcastViewComponent} from "./podcast/content.podcast.view.component";
import {ContentVideoEditComponent} from "./video/content.video.edit.component";
import {ContentVideoViewComponent} from "./video/content.video.view.component";

const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'article/edit', component: ContentArticleEditComponent },
  { path: 'article/view', component: ContentArticleViewComponent },
  { path: 'podcast/edit', component: ContentPodcastEditComponent },
  { path: 'pudcast/view', component: ContentPodcastViewComponent },
  { path: 'video/edit', component: ContentVideoEditComponent },
  { path: 'video/view', component: ContentVideoViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
