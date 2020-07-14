import {FormControl, FormGroup} from "@angular/forms";
import {KeyValueConfiguration} from "../../data/key.value.configuration";
import {Observable} from "rxjs";

/**
 * Since Angular doesn't yet allow coniguration parameters on FormGroups and FormControls,
 * we introduce key-value configurable classes which contain both the formConfig/formgroup/formcontrols
 * themselves as and the respective configurations. Note: the keys of the configuration should match the
 * names of the controls (according to the structure of Angular Reactive Forms).
 */
export class FormConfig extends KeyValueConfiguration<FormGroupConfig> {
	form: FormGroup;
	groups: FormGroupConfig[];
	submit: () => void;

	constructor(form: FormGroup,
	            submit: () => void) {
		super();
		this.form =  form;
		this.submit = submit;
	}
	
	setGroups(groups: FormGroupConfig[]): FormConfig {
		this.groups = groups;
		return this;
	}
	
	setConfiguration(config: { [p: string]: any }): FormConfig {
		super.setConfiguration(config);
		return this;
	}
}

export class FormGroupConfig extends KeyValueConfiguration<FormControlConfig> {
	formGroup: FormGroup;
	controls: FormControlConfig[];
	
	constructor(formGroup: FormGroup) {
		super();
		this.formGroup = formGroup;
	}
	
	setControls(controls: FormControlConfig[]): FormGroupConfig {
		this.controls = controls;
		return this;
	}
	
	setConfiguration(config: { [p: string]: any }): FormGroupConfig {
		super.setConfiguration(config);
		return this;
	}
}

export class FormControlConfig extends KeyValueConfiguration<any> {
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