import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormConfig} from "../../config/form.config";
import {FormControlConfig} from "../../config/controls/form.control.config";
import {FormElementFocusService} from "../../services/form.element.focus.service";
import {isArrowLeftRight, isBackspace, isDelete, isNumeric, KeyCodes} from "../../../keyboard/keys";
import {AppConfigService} from "../../../../app.config.service";
import {DateFormatMap} from "../../../../_data/date.format.map";
import {FormControl, FormGroup} from "@angular/forms";
import {Direction} from "../../../../_data/_enums";

@Component({
	selector: 'tmt-form-date-input',
	templateUrl: './form.date.input.component.html',
	styleUrls: ['./form.date.input.component.scss']
})
export class FormDateInputComponent implements OnInit, AfterViewInit {
	@Input() form: FormGroup;
	@Input() formConfig: FormConfig;
	@Input() control: FormControl;
	@Input() controlConfig: FormControlConfig;
	@ViewChild('focusElement') focusElement;
	dateFormat: { format: string, separator: string, regexSep: RegExp };
	splitFormat: string[];
	valued: string[];
	typed: string;
	
	constructor(private elementFocusService: FormElementFocusService,
	            private appConfigService: AppConfigService) {
	}
	
	ngOnInit(): void {
		this.ensureDate();
		this.control.valueChanges.subscribe(value => {
			this.controlConfig.shouldValidate(true);
		});
	}
	
	ngAfterViewInit(): void {
		this.elementFocusService.setFocus(this.focusElement, this.formConfig.firstFocus);
	}
	
	keyUp(event: KeyboardEvent):void {
		if(isNumeric(event.keyCode)) {
			this.typed = this.typed + event.key;
		} else if (isBackspace(event.keyCode) || isDelete(event.keyCode)) {
			this.delete();
		} else if (isArrowLeftRight(event.keyCode)) {
			//this.parallelCursor(event.keyCode);
		}
		this.updateValue();
	}
	
	private delete() {
		this.typed = this.control.value.replace(this.dateFormat.regexSep, '');
		console.log('value: ' + this.control.value + ', typed: ' + this.typed);
	}
	
	private updateValue() {
		let value:string[] = [];
		const first = this.splitFormat[0].length;
		const second = first + this.splitFormat[1].length;
		const third = second + this.splitFormat[2].length;
		
		if(this.typed.length >= 0) {
			value.push(this.typedToValue(0, first));
		}
		if (this.typed.length >= first) {
			value.push(this.typedToValue(first, second));
		}
		if (this.typed.length >= second) {
			value.push(this.typedToValue(second, third));
		}
		if (this.typed.length === 0) {
			value.length = 0;
		}
		this.valued = value;
		this.control.setValue(this.valueToDate());
	}
	
	private typedToValue(from: number, to: number):string {
		return this.typed.substring(from, to);
	}
	
	private ensureDate() {
		this.dateFormat = this.dateFormat || new DateFormatMap().get(this.appConfigService.appLanguage());
		this.splitFormat = this.dateFormat.format.split(this.dateFormat.regexSep);
		this.valued = [];
		this.typed = '';
	}
	
	private valueToDate():string {
		let s = '';
		for (let i = 0, len = this.valued.length; i < len; i++) {
			s = s + this.valued[i];
			if (i < len - 1) {
				s = s + this.dateFormat.separator;
			}
		}
		return s;
	}
}