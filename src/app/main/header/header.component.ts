import { Component, OnInit } from '@angular/core';
//icons
import {faSignInAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../auth/auth.service";

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
  location = { hint: '' };
  
  constructor(public translate: TranslateService,
              private authService: AuthService,
              private router: Router) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.username = localStorage.getItem('tmt-username');
    this.router.events.subscribe((value => {
      if (this.router.url === '/') {
        this.location.hint = '.home';
      } else {
        this.location.hint = this.hint(this.router.url);
      }
    }));
  }
  
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  
  logout() {
    console.log('Der Arsch will weg!');
  }
  
  private hint(url: string) {
    let s = '';
    let array = url.split(/\//g);
    for (let i = 0, len = array.length; i < len; i++) {
      if (isNaN(Number(array[i]))) {
        s = s + array[i];
        if (i != len-1) {
          s = s + '.';
        }
      }
    }
    return s;
  }
}
