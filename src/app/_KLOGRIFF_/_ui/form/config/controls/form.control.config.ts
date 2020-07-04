import {FormControlValidation} from "./validation/form.control.validation";
import {ValidatorFn} from "@angular/forms";
import {FormControlTabindex} from "../form.control.tabindex";
import {FormControlValidationMap} from "./validation/form.control.validation.map";

export abstract class FormControlConfig implements FormControlTabindex {
	type: string;
	key: string;
	validation: FormControlValidationMap;
	isValidating: boolean;
	order: number;
	private tab: number;
	
	protected constructor(config: {
		type: string,
		key: string,
		validation: FormControlValidationMap,
		order: number
	}) {
		this.type = config.type;
		this.key = config.key;
		this.validation = config.validation;
		this.isValidating = false;
		this.order = config.order;
	}
	
	shouldValidate = (should?: boolean):boolean => {
		if (should !== undefined) {
			this.isValidating = should;
		}
		return this.isValidating;
	};
	
	validators = ():ValidatorFn[] => {
		let validators:ValidatorFn[] = [];
		for (let value of this.validation.values()) {
			if (value.active) {
				validators.push(value.validator);
			}
		}
		return validators;
	};
	
	tabIndex = (index?: number): number => {
		if (index) {
			this.tab = index;
		}
		return this.tab;
	}
}

export function validation(control: string):FormControlValidationMap {
	return new FormControlValidationMap(control);
}
