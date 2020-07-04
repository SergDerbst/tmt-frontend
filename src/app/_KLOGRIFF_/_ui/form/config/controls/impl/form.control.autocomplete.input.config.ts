import {FormControlDataConfig} from "../form.control.data.config";
import {DataService} from "../../../services/data/data.service";
import {FormControlValidationMap} from "../validation/form.control.validation.map";

export class FormControlAutocompleteInputConfig<T> extends FormControlDataConfig<T> {
	dataService: DataService<string>;
	
	constructor(config: {
		type: 'autocomplete',
		key: string,
		validation: FormControlValidationMap,
		data: { options: { key:string, value: T }[]},
		selection: { current: string, index: number },
		order: number,
		dataService: DataService<string>
	}) {
		super(config);
		this.dataService = config.dataService;
	}
}