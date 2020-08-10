import { Component, OnInit } from '@angular/core';
import {faSignInAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../_store/state/app.state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUserPlus = faUserPlus;
  faUserCircle = faUserCircle;
  
  constructor(public translate: TranslateService,
              private authService: AuthService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.username = localStorage.getItem('tmt-username');
    
  }
  
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  
  logout() {
    console.log('Der Arsch will weg!');
  }
}
