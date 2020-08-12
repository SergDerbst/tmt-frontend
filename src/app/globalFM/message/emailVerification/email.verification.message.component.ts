import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
	selector: 'tmt-msg-email-verification',
	templateUrl: './email.verification.message.component.html',
	styleUrls: ['./email.verification.message.component.scss']
})
export class EmailVerificationMessageComponent {
	@Input() state: { email: string };
	
	constructor(private router: Router) {
	}
	
	home() {
		this.router.navigateByUrl('/');
	}
}