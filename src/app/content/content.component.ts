import {Component, OnInit} from '@angular/core';
import {faNewspaper} from "@fortawesome/free-solid-svg-icons/faNewspaper";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faPodcast} from "@fortawesome/free-solid-svg-icons/faPodcast";
import {ContentType} from "../_data/_enums";

@Component({
  selector: 'tmt-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  contentTypes: string[];
  selectedType: string;
  faNewspaper = faNewspaper;
  faVideo = faVideo;
  faPodcast = faPodcast;
    
  constructor() { }

  ngOnInit(): void {
    this.contentTypes = [ContentType.Article, ContentType.Video, ContentType.Podcast];
    this.selectedType = this.contentTypes[0];
  }
  
  selectType(index: number) {
    this.selectedType = this.contentTypes[index];
  }
}
