import {Component, OnInit} from '@angular/core';
import {faNewspaper} from "@fortawesome/free-solid-svg-icons/faNewspaper";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faPodcast} from "@fortawesome/free-solid-svg-icons/faPodcast";
import {TranslateService} from "@ngx-translate/core";
import {select, Store} from "@ngrx/store";
import {selectContentAdminState} from "../_store/content.selector";
import {ContentSelectContentTypeAction} from "../_store/content.actions";
import {ContentAdminState, initialContentAdminState} from "../_store/content.state";

@Component({
  selector: 'tmt-content-admin',
  templateUrl: './content.admin.component.html',
  styleUrls: ['./content.admin.component.scss']
})
export class ContentAdminComponent implements OnInit {
  adminState: ContentAdminState;
  faNewspaper = faNewspaper;
  faVideo = faVideo;
  faPodcast = faPodcast;
    
  constructor(public translate: TranslateService,
              private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(selectContentAdminState)).subscribe((adminState) => {
      this.adminState = adminState;
    });
  }
  
  selectType(index: number) {
    this.store.dispatch(new ContentSelectContentTypeAction({ index: index }));
  }
}
