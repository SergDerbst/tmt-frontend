import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {faCaretDown, faCaretLeft} from "@fortawesome/free-solid-svg-icons";
import {FormControl} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-form-control-select',
	templateUrl: './form.control.select.component.html',
	styleUrls: ['./form.control.select.component.scss']
})
export class FormControlSelectComponent implements OnInit {
	faCaretDown = faCaretDown;
	faCaretLeft = faCaretLeft;
	@Input() formName: string;
	@Input() controlName: string;
	@Input() control: FormControl;
	@Input() data: any[];
	@Input() index: number;
	@Input() translatePrefix: string;
	showList: boolean;
	
	constructor(public translate: TranslateService) {
	}
	
	ngOnInit(): void {
		this.showList = false;
	}
	
	toggleList(): void {
		this.showList = !this.showList;
	}
	
	select(i: number): void {
		this.control.setValue(this.data[i]);
		this.showList = false;
	}
}