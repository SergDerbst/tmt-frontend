import {FormGroup} from "@angular/forms";

export function equalValueValidator(firstControl: string, secondControl: string) {
	return (formGroup:FormGroup):{[key:string]: any} | null  => {
		const _equalValue = '.equalValue';
		const first = formGroup.get(firstControl).value;
		const second = formGroup.get(secondControl).value;
		
		return first === second ? null : {
			[firstControl + _equalValue]: true,
			[secondControl + _equalValue]: true
		};
	};
}