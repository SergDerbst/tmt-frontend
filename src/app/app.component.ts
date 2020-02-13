import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-main></app-main> 
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'tmt-frontend';
  faCoffee = faCoffee;
}
