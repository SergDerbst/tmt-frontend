import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";

import {faCaretDown, faCaretLeft} from '@fortawesome/free-solid-svg-icons';
import {FormConfig} from "../../config/form.config";
import {FormElementFocusService} from "../../services/form.element.focus.service";
import {KeyCodes} from "../../../keyboard/keys";
import {FormControlDataConfig} from "../../config/controls/form.control.data.config";
import {Direction, Title} from "../../../../_data/_enums";

@Component({
	selector: 'tmt-form-select',
	templateUrl: './form.select.component.html',
	styleUrls: ['./form.select.component.scss']
})
export class FormSelectComponent implements OnInit, AfterViewInit {
	@Input() formConfig: FormConfig;
	@Input() controlConfig: FormControlDataConfig<Title>;
	@Input() control: FormControl;
	@ViewChild('focusElement') focusElement;
	
	faCaretDown = faCaretDown;
	faCaretLeft = faCaretLeft;
	hasFocus = false;
	showList = false;
	
	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private elementFocusService: FormElementFocusService) {
	}
	
	ngOnInit(): void {
		this.control.setValue(this.controlConfig.data.options[0].value);
	}
	
	ngAfterViewInit(): void {
		this.elementFocusService.setFocus(this.focusElement, this.formConfig.firstFocus);
	}
	
	select(index: number) {
		this.control.setValue(this.controlConfig.data.options[index].value);
		this.showList = false;
	}
	
	toggleList() {
		this.showList = !this.showList;
	}
	
	toggleFocus() {
		this.hasFocus = !this.hasFocus;
		this.changeDetectorRef.detectChanges();
	}
	
	anchorBlur() {
		if (this.showList) {
			this.toggleList();
		}
	}

	anchorKeyUp(event: KeyboardEvent) {
		if (!this.showList) {
			if (event.keyCode === KeyCodes.DownArrow) {
				this.toggleList();
			}
		} else {
			let options = this.controlConfig.data.options;
			let index = this.controlConfig.selection.index;
			switch(event.keyCode) {
				case KeyCodes.DownArrow:
					this.setSelection(newIndex(options.length, index, Direction.Down));
					break;
				case KeyCodes.UpArrow:
					this.setSelection(newIndex(options.length, index, Direction.Up));
					break;
				case KeyCodes.Enter:
					this.select(this.controlConfig.selection.index);
					break;
			}
		}
		
		function newIndex(max: number, index: number, direction: Direction):number {
			switch(direction) {
				case Direction.Down:
					return index + 1 === max ? 0 : index + 1;
				case Direction.Up:
					return index - 1 < 0 ? max - 1 : index - 1;
			}
			return 0;
		}
	}
	
	private setSelection(index: number) {
		this.controlConfig.selection = {
			index: index,
			current: this.controlConfig.data.options[index].value
		};
	}
}