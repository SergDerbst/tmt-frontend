import {Component, OnInit} from '@angular/core';
import {faNewspaper} from "@fortawesome/free-solid-svg-icons/faNewspaper";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faPodcast} from "@fortawesome/free-solid-svg-icons/faPodcast";
import {TranslateService} from "@ngx-translate/core";
import {ContentAdminState} from "../_store/content.state";
import {ContentPatchbay} from "../content.patchbay";

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
              private jBox: ContentPatchbay) {}

  ngOnInit(): void {
    this.jBox.store().adminState$().subscribe((adminState) => {
      this.adminState = adminState;
    });
  }
  
  selectType(index: number) {
    this.jBox.store().setContentType(index);
  }
}
