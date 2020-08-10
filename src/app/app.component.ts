import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-main></app-main> 
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  
  constructor(public translate: TranslateService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
  
  ngOnInit(): void {
    //localStorage.clear();
  }
}
