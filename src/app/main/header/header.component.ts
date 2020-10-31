import { Component, OnInit } from '@angular/core';
import {faSignInAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from "@ngx-translate/core";
import {AppPatchbay} from "../../app.patchbay";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;
  isAuthenticated: boolean;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUserPlus = faUserPlus;
  faUserCircle = faUserCircle;
  
  constructor(public translate: TranslateService,
              private junctionBox: AppPatchbay) {}

  ngOnInit() {
    this.junctionBox.auth().userName$().subscribe((username) => this.username = username);
    this.junctionBox.auth().isAuthenticated$().subscribe((isAuthenticated) => this.isAuthenticated = isAuthenticated);
  }
  
  logout() {
    console.log('Der Arsch will weg!');
  }
}
