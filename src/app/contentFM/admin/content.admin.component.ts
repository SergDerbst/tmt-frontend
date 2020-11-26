import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faNewspaper} from "@fortawesome/free-solid-svg-icons/faNewspaper";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faPodcast} from "@fortawesome/free-solid-svg-icons/faPodcast";
import {TranslateService} from "@ngx-translate/core";
import {ContentAdminState, ContentFilterState} from "../_store/content.state";
import {Observable} from "rxjs";
import {ContentType} from "../../_utils/data/enums";

@Component({
  selector: 'tmt-content-admin',
  templateUrl: './content.admin.component.html',
  styleUrls: ['./content.admin.component.scss']
})
export class ContentAdminComponent implements OnInit {
  @Input() adminState$: Observable<ContentAdminState>;
  @Input() filterState$: Observable<ContentFilterState>;
  @Output() contentCreate = new EventEmitter();
  @Output() contentFilterSelect = new EventEmitter();
  @Output() contentTypeSelected = new EventEmitter();
  adminState: ContentAdminState;
  faNewspaper = faNewspaper;
  faVideo = faVideo;
  faPodcast = faPodcast;
    
  constructor(public translate: TranslateService) {}
  
  ngOnInit(): void {
    this.adminState$.subscribe((adminState: ContentAdminState) => {
      this.adminState = adminState;
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
