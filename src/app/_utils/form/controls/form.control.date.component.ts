import {Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";
import {isBackspace, isEsc, isNumeric} from "../../keyboard/keys";
import {DateFormatMap} from "../../data/date.and.time";
import {DateTimeUnit} from "../../data/enums";
import {AppConfigService} from "../../../app.config.service";

@Component({
	selector: 'tmt-form-control-date',
	templateUrl: './form.control.date.component.html',
	styleUrls: ['./form.control.date.component.scss']
})
export class FormControlDateComponent implements OnInit {
	@Input() formName: string;
	@Input() controlName: string;
	@Input() control: FormControl;
	@Input() index: number;
	
	dateFormat: { format: string, separator: string, regexSep: RegExp };
	splitFormat: string[];
	dateValue: { unit:DateTimeUnit, value: string }[];
	_currentState: { typeCount: number, focus: number };
	
	constructor(public translate: TranslateService,
	            private appConfigService: AppConfigService) {}
	
	ngOnInit(): void {
		this.prepareDateValue();
	}
	
	unfocus() {
		this._currentState.focus = this.splitFormat.length;
	}
	
	focus(on:number) {
		this._currentState.focus = on;
	}
	
	keyUp(event: KeyboardEvent): void {
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