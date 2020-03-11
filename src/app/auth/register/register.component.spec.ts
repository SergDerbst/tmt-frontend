import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { RegisterComponent } from "./register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormComponent } from "../../_ui/form/form.component";
import { TranslateModule } from "@ngx-translate/core";
import { CountryDataService } from "../../_ui/form/services/data/country.data.service";
import { mockProvider } from "@ngneat/spectator/jest";
import { FormAssemblyService } from "../../_ui/form/services/form.assembly.service";
import { FormComponentSpecHelper } from '../../_ui/form/form.component.spec.helper';

describe('RegisterComponent', () => {
	let specHelper = new FormComponentSpecHelper();
	let componentSpectator: Spectator<RegisterComponent>;
	const createComponent = createComponentFactory({
		component: RegisterComponent,
		declarations: [
			FormComponent
		],
		imports: [
			ReactiveFormsModule,
			TranslateModule.forRoot()
		],
		providers: [
			FormAssemblyService,
			mockProvider(CountryDataService)
		]
	});
	
	beforeEach(() => componentSpectator = createComponent());
	
	it('should have a register form title', () => {
		expect(componentSpectator.query('div.tmt-form-title'))
			.toHaveText('auth.register.form.caption');
	});
	
	describe('1st group of form controls: personal data', () => {
		let groupContainer: Element;
		let groupControls: NodeListOf<Element>;
		
		beforeEach(() => {
			groupContainer = componentSpectator.query(specHelper.select.groupContainerSelector('personal.data'));
			groupControls = specHelper.select.groupControlContainers(groupContainer);
		});
		
		it('should have a caption for personal data', () => {
			let groupCaption:Element = specHelper.select.groupCaption(groupContainer);
			
			expect(groupContainer).toHaveClass('tmt-form-group');
			expect(groupCaption).toHaveText('auth.register.form.group.caption.personal.data');
		});
		
		it('should have six form controls for personal data', () => {
			expect(groupControls.length).toBe(6);
		});
		
		describe('1st control: title', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[0]);
				control = specHelper.select.groupControl(groupControls[0], 'select');
			});
			
			it('should be labeled for required property title', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.title');
			});
			
			it('should be input.select with options: male, female', () => {
				let options = control.querySelectorAll('option');
				expect(options.length).toBe(2);
				expect(options[0]).toHaveText('auth.register.form.control.title.mister');
				expect(options[1]).toHaveText('auth.register.form.control.title.misses');
			});
		});
		
		describe('2nd control: first name', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[1]);
				control = specHelper.select.groupControl(groupControls[1], 'input.generic[ng-reflect-name="first.name"]');
			});
			
			it('should be labeled for required property first name', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.first.name');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('3rd control: middle name', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[2]);
				control = specHelper.select.groupControl(groupControls[2], 'input.generic[ng-reflect-name="middle.name"]');
			});
			
			it('should be labeled for not required property middle name', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(1);
				expect(spans[0]).not.toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('auth.register.form.control.middle.name');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('4th control: last name', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[3]);
				control = specHelper.select.groupControl(groupControls[3], 'input.generic[ng-reflect-name="last.name"]');
			});
			
			it('should be labeled for required property last name', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.last.name');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('5th control: birthday', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[4]);
				control = specHelper.select.groupControl(groupControls[4], 'input.generic[ng-reflect-name="birthday"]');
			});
			
			it('should be labeled for required property birthday', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.birthday');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'date');
			});
		});
		
		describe('6th control: sex', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[5]);
				control = specHelper.select.groupControl(groupControls[5], 'select');
			});
			
			it('should be labeled for not required property sex', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(1);
				expect(spans[0]).not.toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('auth.register.form.control.sex');
			});
			
			it('should be input.select with options: male, female, other', () => {
				let options = control.querySelectorAll('option');
				expect(options.length).toBe(3);
				expect(options[0]).toHaveText('auth.register.form.control.sex.male');
				expect(options[1]).toHaveText('auth.register.form.control.sex.female');
				expect(options[2]).toHaveText('auth.register.form.control.sex.other');
			});
		});
	});
	
	describe('2nd group of form controls: credentials', () => {
		let groupContainer: Element;
		let groupControls: NodeListOf<Element>;
		
		beforeEach(() => {
			groupContainer = componentSpectator.query(specHelper.select.groupContainerSelector('credentials'));
			groupControls = specHelper.select.groupControlContainers(groupContainer);
		});
		
		it('should have a caption for credentials', () => {
			let groupCaption:Element = specHelper.select.groupCaption(groupContainer);
			
			expect(groupContainer).toHaveClass('tmt-form-group');
			expect(groupCaption).toHaveText('auth.register.form.group.caption.credentials');
		});
		
		it('should have five form controls for personal data', () => {
			expect(groupControls.length).toBe(5);
		});
		
		describe('1st control: username', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[0]);
				control = specHelper.select.groupControl(groupControls[0], 'input.generic[ng-reflect-name="username"]');
			});
			
			it('should be labeled for required property username', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.username');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('2nd control: password', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[1]);
				control = specHelper.select.groupControl(groupControls[1], 'input.generic[ng-reflect-name="password"]');
			});
			
			it('should be labeled for required property password', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.password');
			});
			
			it('should be password input.generic', () => {
				expect(control).toHaveAttribute('type', 'password');
			});
		});
		
		describe('3rd control: confirm password', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[2]);
				control = specHelper.select.groupControl(groupControls[2], 'input.generic[ng-reflect-name="password.confirm"]');
			});
			
			it('should be labeled for required property confirm password', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.password.confirm');
			});
			
			it('should be password input.generic', () => {
				expect(control).toHaveAttribute('type', 'password');
			});
		});
		
		describe('4th control: email', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[3]);
				control = specHelper.select.groupControl(groupControls[3], 'input.generic[ng-reflect-name="email"]');
			});
			
			it('should be labeled for required property email', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.email');
			});
			
			it('should be email input.generic', () => {
				expect(control).toHaveAttribute('type', 'email');
			});
		});
		
		describe('5th control: confirm email', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[4]);
				control = specHelper.select.groupControl(groupControls[4], 'input.generic[ng-reflect-name="email.confirm"]');
			});
			
			it('should be labeled for required property confirm email', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.email.confirm');
			});
			
			it('should be email input.generic', () => {
				expect(control).toHaveAttribute('type', 'email');
			});
		});
	});
	
	describe('3rd group of form controls: address', () => {
		let groupContainer: Element;
		let groupControls: NodeListOf<Element>;
		
		beforeEach(() => {
			groupContainer = componentSpectator.query(specHelper.select.groupContainerSelector('address'));
			groupControls = specHelper.select.groupControlContainers(groupContainer);
		});
		
		it('should have a caption for address', () => {
			let groupCaption: Element = specHelper.select.groupCaption(groupContainer);
			
			expect(groupContainer).toHaveClass('tmt-form-group');
			expect(groupCaption).toHaveText('auth.register.form.group.caption.address');
		});
		
		it('should have six form controls for personal data', () => {
			expect(groupControls.length).toBe(6);
		});
		
		describe('1st control: street address 01', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[0]);
				control = specHelper.select.groupControl(groupControls[0], 'input.generic[ng-reflect-name="street1"]');
			});
			
			it('should be labeled for required property street address 01', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.street1');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('2nd control: street address 02', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[1]);
				control = specHelper.select.groupControl(groupControls[1], 'input.generic[ng-reflect-name="street2"]');
			});
			
			it('should be labeled for not required property street address 02', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(1);
				expect(spans[0]).not.toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('auth.register.form.control.street2');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('3rd control: city', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[2]);
				control = specHelper.select.groupControl(groupControls[2], 'input.generic[ng-reflect-name="city"]');
			});
			
			it('should be labeled for required property city', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.city');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('4th control: state / province', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[3]);
				control = specHelper.select.groupControl(groupControls[3], 'input.generic[ng-reflect-name="state"]');
			});
			
			it('should be labeled for required property state', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.state');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('5th control: zip / postal code', () => {
			let label:Element;
			let control: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[4]);
				control = specHelper.select.groupControl(groupControls[4], 'input.generic[ng-reflect-name="postal"]');
			});
			
			it('should be labeled for required property zip / postal code', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.postal');
			});
			
			it('should be text input.generic', () => {
				expect(control).toHaveAttribute('type', 'text');
			});
		});
		
		describe('6th control: country', () => {
			let label:Element;
			let control: Element;
			let list: Element;
			
			beforeEach(() => {
				label = specHelper.select.groupControlLabel(groupControls[5]);
				control = specHelper.select.groupControl(groupControls[5], 'input.generic[ng-reflect-name="country"]');
				list = groupControls[5].querySelector('ul');
			});
			
			it('should be labeled for required property country', () => {
				let spans = label.querySelectorAll('span');
				expect(spans.length).toBe(2);
				expect(spans[0]).toHaveClass('tmt-form-control-required');
				expect(spans[0]).toHaveText('*');
				expect(spans[1]).toHaveText('auth.register.form.control.country');
			});
			//full functionality of the autocomplete will be tested in integration tests
			it('should be autocomplete input.generic with hidden empty options list', () => {
				expect(control).toHaveAttribute('type', 'autocomplete');
				expect(list).toHaveClass('tmt-display-none');
				expect(list.querySelectorAll('li').length).toBe(0);
			});
		});
	});
	
	describe('xtra components', () => {
		let xtraContainer: Element;
		let xtraItems: NodeListOf<Element>;
		
		beforeEach(() => {
			xtraContainer = componentSpectator.query(specHelper.select.xtraContainerSelector());
			xtraItems = specHelper.select.xtraControlContainers(xtraContainer);
		});
		
		it('should have no xtra components', () => {
			expect(xtraItems.length).toBe(0);
		});
	});
	
	describe('buttons', () => {
		let buttonContainer: Element;
		let buttons: NodeListOf<Element>;
		
		beforeEach(() => {
			buttonContainer = componentSpectator.query(specHelper.select.buttonContainerSelector());
			buttons = specHelper.select.buttons(buttonContainer);
		});
		
		it('should have two buttons', () => {
			expect(buttons.length).toBe(2);
		});
		
		it('should have one disabled submit button to the left with label register', () => {
			expect(buttons[0]).toHaveAttribute('disabled');
			expect(buttons[0]).toHaveAttribute('type', 'submit');
			expect(buttons[0]).toHaveText('auth.register.form.button.register');
			//text orientation of inline components is contrary to their visible position due to table cell display
			expect(buttons[0].parentElement).toHaveClass('tmt-txt-right');
		});
		
		it('should have one enabled button to the right with label cancel', () => {
			expect(buttons[1]).not.toHaveAttribute('disabled');
			expect(buttons[1]).toHaveAttribute('type', 'button');
			expect(buttons[1]).toHaveText('auth.register.form.button.cancel');
			//text orientation of inline components is contrary to their visible position due to table cell display
			expect(buttons[1].parentElement).toHaveClass('tmt-txt-left');
		});
	});
});