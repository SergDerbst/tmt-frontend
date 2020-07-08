import {Component, OnInit} from '@angular/core';
import {faNewspaper} from "@fortawesome/free-solid-svg-icons/faNewspaper";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faPodcast} from "@fortawesome/free-solid-svg-icons/faPodcast";
import {ContentFilter, ContentType} from "../_data/enums";
import {TranslateService} from "@ngx-translate/core";
import {ContentConfig} from "./content.config";
import {SearchboxConfig} from "./filter/searchbox/searchbox.config";

@Component({
  selector: 'tmt-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  contentConfig: ContentConfig;
  faNewspaper = faNewspaper;
  faVideo = faVideo;
  faPodcast = faPodcast;
    
  constructor(public translate: TranslateService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.contentConfig = new ContentConfig({
      contentTypes: [
        ContentType.Article,
        ContentType.Video,
        ContentType.Podcast
      ],
      contentFilters: [
        ContentFilter.All,
        ContentFilter.Recent,
        ContentFilter.Published,
        ContentFilter.Unpublished
      ],
      searchboxConfig: new SearchboxConfig({
        placeholderPrefix: 'content.filter.searchbox.placeholderPrefix.',
        contentType: ContentType.Article,
        contentFilter: ContentFilter.Recent
      })
    });
  }
  
  selectType(index: number) {
    this.contentConfig.selectedType = this.contentConfig.contentTypes[index];
    this.contentConfig.searchboxConfig.contentType = this.contentConfig.contentTypes[index];
  }
}
