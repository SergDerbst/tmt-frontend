import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {CountryDataService} from "../../services/data/country.data.service";
import {FormConfig} from "../../config/form.config";
import {FormElementFocusService} from "../../services/form.element.focus.service";
import {DataService} from "../../services/data/data.service";
import {FormControlDataConfig, HighlightableStringValue} from "../../config/controls/form.control.data.config";
import {isLiteral, KeyCodes} from "../../../../../_utils/keyboard/keys";

@Component({
	selector: 'tmt-form-autocomplete-input',
	templateUrl: './form.autocomplete.input.component.html',
	styleUrls: ['./form.autocomplete.input.component.scss']
})
export class FormAutocompleteInputComponent implements OnInit, AfterViewInit {
	@Input() form: FormGroup;
	@Input() formConfig: FormConfig;
	@Input() control: FormControl;
	@Input() controlConfig: FormControlDataConfig<HighlightableStringValue>;
	@ViewChild('focusElement') focusElement;
	dataService: DataService<string>;
	
	constructor(
		private countryDataService: CountryDataService,
		private elementFocusService: FormElementFocusService) {}
	
	ngOnInit(): void {
		this.dataService = this.controlConfig['dataService'] as DataService<string>;
		this.control.valueChanges.subscribe(value => {
			this.controlConfig.shouldValidate(true);
		});
	}
	
	ngAfterViewInit(): void {
		this.elementFocusService.setFocus(this.focusElement, this.formConfig.firstFocus);
	}
	
	handleKeyEvent(event: KeyboardEvent, index?: number): void {
		if (isLiteral(event.keyCode)) {
			this.dataService.fetch(this.control.value).subscribe(this.prepareDataList(this.control.value));
		} else if (this.dataLoadedAndShowing()) {
			switch (event.keyCode) {
			case KeyCodes.UpArrow:
				this.decreaseSelection();
				break;
			case KeyCodes.DownArrow:
				this.increaseSelection();
				break;
			case KeyCodes.Enter:
				this.select(index);
				break;
			}
		}
	}
	
	handleMouseEvent(event: MouseEvent, index: number):void {
		switch(event.type) {
			case 'mouseover':
				this.controlConfig.selection.index = index;
				break;
			case 'click':
				this.select(index);
				break;
		}
	}
	
	private select(index?: number) {
		index = index || this.controlConfig.selection.index;
		if (index >= 0) {
			this.control.setValue(this.controlConfig.data.options[index].value.toString());
			this.controlConfig.data.options = [];
		}
	}
	
	private decreaseSelection() {
		if (this.controlConfig.selection.index - 1 < 0) {
			this.controlConfig.selection.index = this.controlConfig.data.options.length - 1;
		} else {
			this.controlConfig.selection.index = this.controlConfig.selection.index - 1;
		}
	}
	
	private increaseSelection() {
		if (this.controlConfig.selection.index + 1 === this.controlConfig.data.options.length) {
			this.controlConfig.selection.index = 0;
		} else {
			this.controlConfig.selection.index = this.controlConfig.selection.index + 1;
		}
	}
	
	private prepareDataList(typed) {
		return (response) => {
			let data: {key: string, value: HighlightableStringValue }[] = [];
			for(let i = 0, len = response.length; i < len; i++) {
				let key = Object.keys(response[i])[0];
				data.push({ key: key, value: splitForHighlight(response[i][key], typed) });
			}
			this.controlConfig.data.options = data;
		};
		
		function splitForHighlight(value:string, typed:string):HighlightableStringValue {
			let markStart = '<highlight>';
			let markEnd = '</highlight>';
			let v = value.replace(typed, markStart + typed + markEnd);
			return new HighlightableStringValue({
				before: v.substring(0, v.indexOf(markStart)),
				highlight: typed,
				after: v.substring(v.indexOf(markEnd) + markEnd.length, v.length)
			});
		}
	}
	
	private dataLoadedAndShowing() {
		return this.controlConfig.data.options.length > 0;
	}
}