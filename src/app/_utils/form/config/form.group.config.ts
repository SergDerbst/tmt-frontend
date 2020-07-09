import {FormControl, FormGroup} from "@angular/forms";
import {KeyValueConfigutation} from "../../data/key.value.configuration";

/**
 * Since Angular doesn't yet allow coniguration parameters on FormGroups and FormControls,
 * we introduce key-value configurable classes which contain both the form/formgroup/formcontrols
 * themselves as and the respective configurations. Note: the keys of the configuration should match the
 * names of the controls (according to the structure of Angular Reactive Forms).
 */
export class FormConfig extends KeyValueConfigutation<FormGroupConfig> {
	form: FormGroup;
	
	constructor(form: FormGroup) {
		super();
		this.form =  form;
	}
	
	setConfiguration(config: { [p: string]: FormGroupConfig }): FormConfig {
		super.setConfiguration(config);
		return this;
	}
}

export class FormGroupConfig extends KeyValueConfigutation<FormControlConfig>{
	formGroup: FormGroup;
	
	constructor(formGroup: FormGroup) {
		super();
		this.formGroup = formGroup;
	}
	
	setConfiguration(config: { [p: string]: FormControlConfig }): FormGroupConfig {
		super.setConfiguration(config);
		return this;
	}
}

export class FormControlConfig extends KeyValueConfigutation<any>{
	control: FormControl;
	
	constructor(control: FormControl) {
		super();
		this.control = control;
	}
	
	setConfiguration(config: { [p: string]: any }): FormControlConfig {
		super.setConfiguration(config);
		return this;
	}
}