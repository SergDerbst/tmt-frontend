import {Component, OnInit} from '@angular/core';
import {User} from "./auth/_data/user";
import {KeycloakService} from "keycloak-angular";

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
  user:User;
  
  constructor(private keycloakService: KeycloakService) {}
  
  ngOnInit(): void {
    //this.user = this.keycloakService.getUsername();
  }
}
