import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faNewspaper} from "@fortawesome/free-solid-svg-icons/faNewspaper";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faPodcast} from "@fortawesome/free-solid-svg-icons/faPodcast";
import {TranslateService} from "@ngx-translate/core";
import {ContentTypeState, ContentFilterState} from "../_store/admin.state";
import {Observable} from "rxjs";
import {ContentType} from "../../../_utils/data/enums";

@Component({
  selector: 'tmt-content-admin',
  templateUrl: './content.admin.component.html',
  styleUrls: ['./content.admin.component.scss']
})
export class ContentAdminComponent implements OnInit {
  @Input() contentTypeState$: Observable<ContentTypeState>;
  @Input() contentFilterState$: Observable<ContentFilterState>;
  @Output() contentCreate = new EventEmitter();
  @Output() contentFilterSelect = new EventEmitter();
  @Output() contentTypeSelected = new EventEmitter();
  contentTypeState: ContentTypeState;
  faNewspaper = faNewspaper;
  faVideo = faVideo;
  faPodcast = faPodcast;
    
  constructor(public translate: TranslateService) {}
  
  ngOnInit(): void {
    this.contentTypeState$.subscribe((contentTypeState: ContentTypeState) => {
      this.contentTypeState = contentTypeState;
    });
  }
  
  createContent(contentType: ContentType) {
    this.contentCreate.emit(contentType);
  }

  selectContentFilter(index: number) {
    this.contentFilterSelect.emit(index);
  }
  
  selectContentType(index: number) {
    this.contentTypeSelected.emit(index);
  }
}
