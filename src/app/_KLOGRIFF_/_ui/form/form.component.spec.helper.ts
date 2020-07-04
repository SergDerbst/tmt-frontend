export class FormComponentSpecHelper {
	select = {
		buttonContainerSelector: ():string => {
			return 'div.tmt-form-button-container';
		},
		buttons: (parent: Element) => {
			return parent.querySelectorAll('button');
		},
		groupContainerSelector: (key: string):string => {
			return 'div[ng-reflect-name*="' + key + '"]';
		},
		groupCaption: (parent: Element):Element => {
			return parent.querySelector('div.tmt-form-separator.tmt-form-group-separator')
									 .querySelector('span');
		},
		groupControlContainers: (parent: Element): NodeListOf<Element> => {
			return parent.querySelectorAll('div.tmt-form-property');
		},
		groupControlLabel: (parent: Element) => {
			return parent.querySelector('div.tmt-form-property-label').querySelector('label');
		},
		groupControl: (parent: Element, selector: string) => {
			return parent.querySelector('div.tmt-form-property-control').querySelector(selector);
		},
		xtraContainerSelector: ():string => {
			return 'div.tmt-form-xtra-container';
		},
		xtraControlContainers: (parent: Element): NodeListOf<Element> => {
			return parent.querySelectorAll('div.tmt-form-xtra-item');
		},
		xtraLinks: (parent: Element): NodeListOf<Element> => {
			return parent.querySelectorAll('a');
		}
	};
}