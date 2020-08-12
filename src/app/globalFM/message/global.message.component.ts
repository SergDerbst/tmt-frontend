import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-message',
	templateUrl: './global.message.component.html',
	styleUrls: ['./global.message.component.scss']
})
export class GlobalMessageComponent implements OnInit {
	type: string;
	id: string;
	state: { email: string };
	
	constructor(public translate: TranslateService,
	            private route: ActivatedRoute) {}
	
	ngOnInit(): void {
		this.type = this.route.snapshot.paramMap.get('type');
		this.id = this.route.snapshot.paramMap.get('id');
		this.state = history.state;
	}
}