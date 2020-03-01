import {Component, Input} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'tmt-form-autocomplete-input',
	templateUrl: './form.autocomplete.input.component.html',
	styleUrls: ['./form.autocomplete.input.component.scss']
})
export class FormAutocompleteInputComponent {
	@Input() control: FormControl;
}