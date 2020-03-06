import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {CountryDataService} from "../../services/data/country.data.service";
import {FormConfig} from "../../config/form.config";
import {FormControlConfig} from "../../config/controls/form.control.config";
import {FormElementFocusService} from "../../services/form.element.focus.service";

@Component({
	selector: 'tmt-form-autocomplete-input',
	templateUrl: './form.autocomplete.input.component.html',
	styleUrls: ['./form.autocomplete.input.component.scss']
})
export class FormAutocompleteInputComponent implements OnInit, AfterViewInit {
	@Input() control: FormControl;
	@Input() controlConfig: FormControlConfig;
	@Input() formConfig: FormConfig;
	@ViewChild('focusElement') focusElement;
	
	constructor(
		private countryDataService: CountryDataService,
		private elementFocusService: FormElementFocusService) {}
	
	ngOnInit(): void {
	}
	
	ngAfterViewInit(): void {
		this.elementFocusService.setFocus(this.focusElement, this.formConfig.firstFocus);
	}
	
	fetchSelect(event: UIEvent, index?: number, value?: string): void {
		//console.log('arsch bolzen galore machine');
		//console.log(event);
		//this.control['config'].dataService.fetch('').subscribe(data => {
		//});
	}
}