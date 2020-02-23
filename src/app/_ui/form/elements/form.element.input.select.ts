import { KeyValue } from '@angular/common';

import { FormElementBase } from './form.element.base';

export class FormElementInputSelect<K, T> extends FormElementBase<T> {
	type = 'select';
	items: KeyValue<K, T>[];

	constructor(options: {} = {}, items: KeyValue<K, T>[]) {
		super(options);
		this.items = items;
	}
}