import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormConfig} from "../config/form.config";
import {Injectable} from "@angular/core";
import {FormGroupConfig} from "../config/form.group.config";
import {FormControlConfig} from "../config/controls/form.control.config";

@Injectable()
export class FormAssemblyService {
	private tabIndex;
	
	constructor(private fb: FormBuilder) {}
	
	assemble(config: FormConfig):FormGroup {
		this.tabIndex = 2;
		let form = this.fb.group(this.formControlGroups(config.groups));
		form['config'] = config;
		return form;
	}
	
	private formControlGroups(groups: FormGroupConfig[]) {
		let controlGroups = {};
		for (let i = 0, len = groups.length; i < len; i++) {
			controlGroups[groups[i].caption] = {
				caption: groups[i].caption,
				captionVisible: groups[i].captionVisible,
				controls: this.formControls(groups[i].controls)
			};
		}
		return controlGroups;
	}
	
	private formControls(controlConfigs: FormControlConfig[]) {
		let controls = {};
		for (let i = 0, len = controlConfigs.length; i < len; i++) {
			let controlConfig = controlConfigs[i];
			controls[controlConfig.key] = new FormControl('', controlConfig.validators());
			controls[controlConfig.key].config = controlConfig;
			controls[controlConfig.key].config = controlConfig;
			controls[controlConfig.key].config.tabIndex = this.tabIndex++;
		}
		return controls;
	}
}