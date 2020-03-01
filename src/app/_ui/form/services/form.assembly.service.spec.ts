import {createServiceFactory, SpectatorHttp, SpectatorService} from '@ngneat/spectator';
import {FormAssemblyService} from './form.assembly.service';

import {FormBuilder, FormGroup} from '@angular/forms';
import {createFormConfig} from '../../_ui.module.spec.helper';
import {FormElementInputText} from "../elements/form.element.input.text";
import {FormElementInputEmail} from "../elements/form.element.input.email";
import {FormElementInputPassword} from "../elements/form.element.input.password";
import {FormElementInputSelect} from "../elements/form.element.input.select";
import {FormElementInputAutocomplete} from "../elements/form.element.input.autocomplete";
import {CountryDataService} from "./country.data.service";
import {createHttpFactory} from "@ngneat/spectator/jest";

describe('FormService', () => {
	let countryDataServiceSpectator: SpectatorHttp<CountryDataService>;
	const createHttp = createHttpFactory(CountryDataService);
	let formServiceSpectator: SpectatorService<FormAssemblyService>;
	const createFormService = createServiceFactory({
		service: FormAssemblyService,
		providers: [
			FormBuilder
		]
	});
	let form:FormGroup;
	
	beforeEach(() => formServiceSpectator = createFormService());
	
	describe('FormGroup with main properties and basic components', () => {
		beforeEach(() => form = formServiceSpectator.service.assemble(createFormConfig({})));
		
		it('should create FormGroup with main properties and submit service', () => {
			expect(form['id']).toBeDefined();
			expect(form['id']).toBe('id');
			expect(form['text']).toBeDefined();
			expect(form['text']).toBe('text');
			expect(form['showRequired']).toBeDefined();
			expect(form['showRequired']).toBe(true);
			expect(form['submitService']).toBe('arsch');
		});
	
		it('should create element groups as FormGroup controls', () => {
			expect(form.controls).toBeDefined();
			expect(Object.keys(form.controls).length).toBeDefined();
			expect(Object.keys(form.controls).length).toBe(2);
		});
		
		it('should create one group with caption visible', () => {
			expect(form.controls['caption.visible']).toBeDefined();
			expect(form.controls['caption.visible']['captionVisible']).toBeDefined();
			expect(form.controls['caption.visible']['captionVisible']).toBe(true);
		});
		
		it('should create one group with caption invisible', () => {
			expect(form.controls['caption.invisible']).toBeDefined();
			expect(form.controls['caption.invisible']['captionVisible']).toBeDefined();
			expect(form.controls['caption.invisible']['captionVisible']).toBe(false);
		});
		
		it('should attach one control to the visible group whose value is required', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(Object.keys(form.controls['caption.visible']['controls']).length).toBeDefined();
			expect(Object.keys(form.controls['caption.visible']['controls']).length).toBe(1);
			expect(form.controls['caption.visible']['controls']['first']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['first'].type).toBe('type');
			expect(form.controls['caption.visible']['controls']['first'].required).toBe(true);
			expect(form.controls['caption.visible']['controls']['first'].order).toBe(666);
		});
		
		it('should attach one control to the invisible group whose value is not required', () => {
			expect(form.controls['caption.invisible']['controls']).toBeDefined();
			expect(Object.keys(form.controls['caption.invisible']['controls']).length).toBeDefined();
			expect(Object.keys(form.controls['caption.invisible']['controls']).length).toBe(1);
			expect(form.controls['caption.invisible']['controls']['second']).toBeDefined();
			expect(form.controls['caption.invisible']['controls']['second'].type).toBe('type');
			expect(form.controls['caption.invisible']['controls']['second'].order).toBe(23);
		});
		
		it('should create two buttons', () => {
			expect(form['buttons']).toBeDefined();
			expect(Object.keys(form['buttons']).length).toBe(2);
		});
		
		it('should create one validated submit button with left orientation', () => {
			expect(form['buttons']['validated.submit.button']).toBeDefined();
			expect(Object.keys(form['buttons']['validated.submit.button']).length).toBe(10);
			expect(form['buttons']['validated.submit.button'].validate).toBe(true);
			expect(form['buttons']['validated.submit.button'].order).toBe(666);
			expect(form['buttons']['validated.submit.button'].type).toBe('submit');
			expect(form['buttons']['validated.submit.button'].key).toBe('validated.submit.button');
			expect(form['buttons']['validated.submit.button'].orientation).toBe('left');
		});
		
		it('should create one non-validated button with right orientation', () => {
			expect(form['buttons']['invalidated.whatever.button']).toBeDefined();
			expect(Object.keys(form['buttons']['invalidated.whatever.button']).length).toBe(10);
			expect(form['buttons']['invalidated.whatever.button'].validate).toBe(false);
			expect(form['buttons']['invalidated.whatever.button'].order).toBe(23);
			expect(form['buttons']['invalidated.whatever.button'].type).toBe('button');
			expect(form['buttons']['invalidated.whatever.button'].key).toBe('invalidated.whatever.button');
			expect(form['buttons']['invalidated.whatever.button'].orientation).toBe('right');
		});
		
		it('should create one link', () => {
			expect(form['links']).toBeDefined();
			expect(Object.keys(form['links']).length).toBe(1);
			expect(Object.keys(form['links'])[0]).toBe('link');
		});
		
		it('should create one link to elsewhere with left orientation', () => {
			expect(form['links']['link']).toBeDefined();
			expect(Object.keys(form['links']['link']).length).toBe(10);
			expect(form['links']['link'].key).toBe('link');
			expect(form['links']['link'].href).toBe('/elsewhere');
			expect(form['links']['link'].order).toBe(666);
			expect(form['links']['link'].orientation).toBe('left');
		});
	});
	
	describe('FormGroup with input.generic text components', () => {
		beforeEach(() => form = formServiceSpectator.service.assemble(createFormConfig({
			elements: [
				new FormElementInputText({
					key: 'required.text',
					required: true,
					order: 666
				}),
				new FormElementInputText({
					key: 'not.required.text',
					required: false,
					order: 23
				})
			]
		})));
		
		it('should create one group with a required input.generic text element', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['required.text']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['required.text'].type).toBe('text');
			expect(form.controls['caption.visible']['controls']['required.text'].required).toBe(true);
		});
		
		it('should create one group with a not required input.generic text element', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['not.required.text']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['not.required.text'].type).toBe('text');
			expect(form.controls['caption.visible']['controls']['not.required.text'].required).toBe(false);
		});
	});
	
	describe('FormGroup with input.generic email components', () => {
		beforeEach(() => form = formServiceSpectator.service.assemble(createFormConfig({
			elements: [
				new FormElementInputEmail({
					key: 'required.email',
					required: true,
					order: 666
				}),
				new FormElementInputEmail({
					key: 'not.required.email',
					required: false,
					order: 23
				})
			]
		})));
		
		it('should create one group with a required input.generic email element', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['required.email']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['required.email'].type).toBe('email');
			expect(form.controls['caption.visible']['controls']['required.email'].required).toBe(true);
		});
		
		it('should create one group with a not required input.generic email element', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['not.required.email']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['not.required.email'].type).toBe('email');
			expect(form.controls['caption.visible']['controls']['not.required.email'].required).toBe(false);
		});
	});
	
	describe('FormGroup with input.generic password components', () => {
		beforeEach(() => form = formServiceSpectator.service.assemble(createFormConfig({
			elements: [
				new FormElementInputPassword({
					key: 'required.password',
					required: true,
					order: 666
				}),
				new FormElementInputPassword({
					key: 'not.required.password',
					required: false,
					order: 23
				})
			]
		})));
		
		it('should create one group with a required input.generic password element', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['required.password']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['required.password'].type).toBe('password');
			expect(form.controls['caption.visible']['controls']['required.password'].required).toBe(true);
		});
		
		it('should create one group with a not required input.generic password element', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['not.required.password']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['not.required.password'].type).toBe('password');
			expect(form.controls['caption.visible']['controls']['not.required.password'].required).toBe(false);
		});
	});
	
	describe('FormGroup with input.generic select element', () => {
		beforeEach(() => form = formServiceSpectator.service.assemble(createFormConfig({
			elements: [
				new FormElementInputSelect<string, string>({
					key: 'select',
					required: true,
					order: 1
				}, [
					{ key: 'key01', value: 'value01' },
					{ key: 'key02', value: 'value02' },
				])
			]
		})));
		
		it('should create one group with an input.generic select element with select options', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['select']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['select'].type).toBe('select');
			expect(form.controls['caption.visible']['controls']['select'].required).toBe(true);
			expect(form.controls['caption.visible']['controls']['select'].items).toBeDefined();
			expect(form.controls['caption.visible']['controls']['select'].items.length).toBe(2);
			expect(form.controls['caption.visible']['controls']['select'].items[0].key).toBe('key01');
			expect(form.controls['caption.visible']['controls']['select'].items[0].value).toBe('value01');
			expect(form.controls['caption.visible']['controls']['select'].items[1].key).toBe('key02');
			expect(form.controls['caption.visible']['controls']['select'].items[1].value).toBe('value02');
		});
	});
	
	describe('FormGroup with input.generic autocomplete element', () => {
		
		beforeEach(() => {
			countryDataServiceSpectator = createHttp();
			
			form = formServiceSpectator.service.assemble(createFormConfig({
				elements: [
					new FormElementInputAutocomplete({
						key: 'autocomplete',
						required: true,
						order: 666
					}, countryDataServiceSpectator.service)
				]
			}));
		});
		
		it('should create one group with an input.generic autocomplete element', () => {
			expect(form.controls['caption.visible']['controls']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['autocomplete']).toBeDefined();
			expect(form.controls['caption.visible']['controls']['autocomplete'].order).toBe(666);
			expect(form.controls['caption.visible']['controls']['autocomplete'].required).toBe(true);
			expect(typeof form.controls['caption.visible']['controls']['autocomplete'].fetchSelect).toBe('function');
			expect(form.controls['caption.visible']['controls']['autocomplete'].data).toBeDefined();
			expect(form.controls['caption.visible']['controls']['autocomplete'].data.options).toBeDefined();
			expect(form.controls['caption.visible']['controls']['autocomplete'].data.options.length).toBe(0);
			expect(form.controls['caption.visible']['controls']['autocomplete'].selection).toBeDefined();
			expect(form.controls['caption.visible']['controls']['autocomplete'].selection.current).toBe(-1);
			expect(form.controls['caption.visible']['controls']['autocomplete'].items).toBeUndefined();
		});
	});
});
