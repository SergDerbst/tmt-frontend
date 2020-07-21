import {Component, Input, OnInit} from "@angular/core";
import {Snippet} from "../../transcript.data";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: 'tmt-timestamp-control',
	templateUrl: './timestamp.control.html',
	styleUrls: ['./timestamp.control.scss']
})
export class TimestampControl implements OnInit {
	@Input() snippet: Snippet;
	faCaretUp = faCaretUp;
	faCaretDown = faCaretDown;
	
	constructor() {
	}
	
	ngOnInit(): void {
		console.log(this.snippet);
	}
	
	keyDown(event: KeyboardEvent) {
		console.log('urga burga');
	}
	
	up() {
		console.log('hoch damit');
	}
	
	down() {
		console.log('runter damit');
	}
}