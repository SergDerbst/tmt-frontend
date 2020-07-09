import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {FormConfig} from "../../config/form.config";
import {FormControlConfig} from "../../config/controls/form.control.config";
import {FormElementFocusService} from "../../services/form.element.focus.service";
import {AppConfigService} from "../../../../../app.config.service";
import {DateFormatMap} from "../../../../../_utils/data/date.format.map";
import {FormControl, FormGroup} from "@angular/forms";
import {DateTimeUnit, Direction} from "../../../../../_utils/data/enums";
import {isBackspace, isEsc, isNumeric} from "../../../../../_utils/keyboard/keys";

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
	dateValue: { unit:DateTimeUnit, value: string }[];
	_currentState: { typeCount: number, focus: number };
	
	constructor(private elementFocusService: FormElementFocusService,
	            private appConfigService: AppConfigService) {
	}
	
	ngOnInit(): void {
		this.prepareDateValue();
		this.control.valueChanges.subscribe(value => {
			this.controlConfig.shouldValidate(true);
		});
	}
	
	ngAfterViewInit(): void {
		this.elementFocusService.setFocus(this.focusElement, this.formConfig.firstFocus);
		this.focus(0);
	}
	
	unfocus() {
		this._currentState.focus = this.splitFormat.length;
	}
	
	focus(on:number) {
		this._currentState.focus = on;
	}
	
	keyUp(event: KeyboardEvent) {
		if(isNumeric(event.keyCode) && !this.dateDoneTyping()) {
			this.addToValue(event.key);
		} else if (isBackspace(event.keyCode)) {
			if(this.outOfFocus()) {
				this.decreaseFocus();
			}
			if (this.elementHasValue()) {
				this.eraseValue();
			}
			if (this.elementNotFirst()) {
				this.decreaseFocus();
			}
		} else if (isEsc(event.keyCode)) {
			this.clearValue();
		}
		this.updateTypeCount();
		this.buildValue();
	}
	
	private buildValue() {
		let date = {};
		for (let i = 0, len = this.dateValue.length; i < len; i++) {
			date[this.dateValue[i].unit] = this.dateValue[i].value;
		}
		this.control.setValue(date);
	}
	
	private elementNotFirst() {
		return this._currentState.focus > 0;
	}
	
	private eraseValue() {
		this.dateValue[this._currentState.focus].value = '';
	}
	
	private elementHasValue() {
		return this.dateValue[this._currentState.focus].value;
	}
	
	private decreaseFocus() {
		this._currentState.focus = this._currentState.focus - 1;
	}
	
	private outOfFocus() {
		return this._currentState.focus >= this.dateValue.length;
	}
	
	private addToValue(key: string) {
		if(this.valueFull()) {
			this._currentState.focus = this._currentState.focus + 1;
		}
		this.dateValue[this._currentState.focus].value = this.dateValue[this._currentState.focus].value + key;
	}
	
	private valueFull() {
		return this.dateValue[this._currentState.focus].value.length === this.splitFormat[this._currentState.focus].length;
	}
	
	private updateTypeCount() {
		let count = 0;
		for(let i = 0, len = this.dateValue.length; i < len; i++) {
			count = count + this.dateValue[i].value.length;
		}
		this._currentState.typeCount = count;
	}
	
	private dateDoneTyping() {
		let done = true;
		for (let i = 0, len = this.dateValue.length; i < len; i++) {
			if (this.dateValue[i].value.length < this.splitFormat[i].length) {
				done = false;
			}
		}
		return done;
	}
	
	private prepareDateValue() {
		this.dateValue = [];
		this.dateFormat = this.dateFormat || new DateFormatMap().get(this.appConfigService.appLanguage());
		this.splitFormat = this.dateFormat.format.split(this.dateFormat.regexSep);
		this._currentState = { typeCount: 0, focus: 0 };
		
		for (let i = 0, len = this.splitFormat.length; i < len; i++) {
			switch(this.splitFormat[i]) {
				case 'DD':
					this.dateValue.push({ unit: DateTimeUnit.day, value: '' });
					break;
				case 'MM':
					this.dateValue.push({ unit: DateTimeUnit.month, value: '' });
					break;
				case 'YYYY':
					this.dateValue.push({ unit: DateTimeUnit.year, value: '' });
					break;
			}
		}
	}
	
	private clearValue() {
		this.prepareDateValue();
	}
}
