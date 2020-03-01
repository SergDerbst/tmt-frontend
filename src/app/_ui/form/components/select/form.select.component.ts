import {Component, Input, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

import {faCaretDown, faCaretLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'tmt-form-select',
	templateUrl: './form.select.component.html',
	styleUrls: ['./form.select.component.scss']
})
export class FormSelectComponent implements OnInit {
	@Input() formId: string;
	@Input() controlId: string;
	@Input() control: FormControl;
	
	faCaretDown = faCaretDown;
	faCaretLeft = faCaretLeft;
	showList = false;
	
	ngOnInit(): void {
	}
	
	select(index: number) {
		console.log('popo slap galore: ' + this.control['config']['select'].items[index].value);
		this.control.setValue(this.control['config']['select'].items[index].value);
		this.showList = false;
	}
	
	toggleList() {
		this.showList = !this.showList;
	}
}