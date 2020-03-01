import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { LoginComponent } from "./login.component";
import { FormComponentSpecHelper } from "../../_ui/form/form.component.spec.helper";
import { FormComponent } from "../../_ui/form/form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FormAssemblyService } from "../../_ui/form/services/form.assembly.service";

describe('LoginComponent', () => {
	let specHelper = new FormComponentSpecHelper();
	let componentSpectator: Spectator<LoginComponent>;
	const createComponent = createComponentFactory({
		component: LoginComponent,
		declarations: [
			FormComponent
		],
		imports: [
			ReactiveFormsModule,
			TranslateModule.forRoot()
		],
		providers: [
			FormAssemblyService
		]
	});
	
	beforeEach(() => componentSpectator = createComponent());
	
	it('should have a login form title', () => {
		expect(componentSpectator.query('div.tmt-form-title'))
			.toHaveText('auth.login.form.caption');
	});
	
	describe('1st group of form controls: credentials', () => {
		let groupContainer: Element;
		let groupControls: NodeListOf<Element>;
		
		beforeEach(() => {
			groupContainer = componentSpectator.query(specHelper.select.groupContainerSelector('credentials'));
			groupControls = specHelper.select.groupControlContainers(groupContainer);
		});
		
		it('should have a caption for credentials', () => {
			let groupCaption: Element = specHelper.select.groupCaption(groupContainer);
			
			expect(groupContainer).toHaveClass('tmt-form-group');
			expect(groupCaption).toHaveText('auth.login.form.group.caption.credentials');
		});
		
		it('should have two form controls for credentials', () => {
			expect(groupControls.length).toBe(2);
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
				expect(spans[1]).toHaveText('auth.login.form.control.username');
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
				expect(spans[1]).toHaveText('auth.login.form.control.password');
			});
			
			it('should be password input.generic', () => {
				expect(control).toHaveAttribute('type', 'password');
			});
		});
	});
	
	describe('xtra components', () => {
		let xtraContainer: Element;
		let xtraLinks: NodeListOf<Element>;
		
		beforeEach(() => {
			xtraContainer = componentSpectator.query(specHelper.select.xtraContainerSelector());
			xtraLinks = specHelper.select.xtraLinks(xtraContainer);
		});
		
		it('should have two xtra components', () => {
			expect(xtraLinks.length).toBe(2);
		});
		
		it('should have one link to the left for when the user forgot his password', () => {
			expect(xtraLinks[0]).toHaveAttribute('href', 'auth/forgotten');
			expect(xtraLinks[0]).toHaveText('auth.login.form.link.forgotten');
			expect(xtraLinks[0].parentElement).toHaveClass('tmt-txt-right');
		});
		
		it('should have one link to the right to register as a new user', () => {
			expect(xtraLinks[1]).toHaveAttribute('href', 'auth/register');
			expect(xtraLinks[1]).toHaveText('auth.login.form.link.register');
			expect(xtraLinks[1].parentElement).toHaveClass('tmt-txt-left');
		});
	});
});