import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [ContentComponent],
	imports: [
		CommonModule,
		ContentRoutingModule,
		FontAwesomeModule
	]
})
export class ContentModule { }
