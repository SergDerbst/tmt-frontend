import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import {ContentArticleEditComponent} from "./article/content.article.edit.component";
import {ContentArticleViewComponent} from "./article/content.article.view.component";
import {ContentPodcastEditComponent} from "./podcast/content.podcast.edit.component";
import {ContentPodcastViewComponent} from "./podcast/content.podcast.view.component";
import {ContentVideoEditComponent} from "./video/content.video.edit.component";
import {ContentVideoViewComponent} from "./video/content.video.view.component";
import {ContentArticleCreateComponent} from "./article/content.article.create.component";
import {ContentPodcastCreateComponent} from "./podcast/content.podcast.create.component";
import {ContentVideoCreateComponent} from "./video/content.video.create.component";
import {GlobalMessageComponent} from "../global/message/global.message.component";

const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'article/create', component: ContentArticleCreateComponent },
  { path: 'article/edit', component: ContentArticleEditComponent },
  { path: 'article/view', component: ContentArticleViewComponent },
  { path: 'podcast/create', component: ContentPodcastCreateComponent },
  { path: 'podcast/edit', component: ContentPodcastEditComponent },
  { path: 'pudcast/view', component: ContentPodcastViewComponent },
  { path: 'video/create', component: ContentVideoCreateComponent },
  { path: 'video/edit', component: ContentVideoEditComponent },
  { path: 'video/view', component: ContentVideoViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
