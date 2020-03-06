import {ElementRef, Injectable} from "@angular/core";

@Injectable()
export class FormElementFocusService {
	setFocus(focusElement: ElementRef, tabIndex?:number) {
		tabIndex = tabIndex | 0;
		if (focusElement.nativeElement.tabIndex === tabIndex) {
			focusElement.nativeElement.focus();
		}
	}
}