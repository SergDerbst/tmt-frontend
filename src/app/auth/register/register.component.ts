import {Component, OnInit} from '@angular/core';

import {Direction, Sex, Title} from '../../_data/_enums';
import {CountryDataService} from '../../_ui/form/services/data/country.data.service';
import {FormGroupConfig} from '../../_ui/form/config/form.group.config';
import {FormSubmitService} from "../../_ui/form/services/form.submit.service";
import {FormConfig} from "../../_ui/form/config/form.config";
import {FormControlSelectInputConfig} from "../../_ui/form/config/controls/impl/form.control.select.input.config";
import {FormControlGenericInputConfig} from "../../_ui/form/config/controls/impl/form.control.generic.input.config";
import {FormControlAutocompleteInputConfig} from "../../_ui/form/config/controls/impl/form.control.autocomplete.input.config";
import {FormXtraButtonConfig} from "../../_ui/form/config/xtras/impl/form.xtra.button.config";
import {FormControlValidationMap} from "../../_ui/form/config/controls/validation/form.control.validation.map";
import {equalValueValidator} from "../../_ui/form/config/controls/validation/form.group.validation";

@Component({
  selector: 'tmt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formConfig: FormConfig;

  constructor(
    private countryDataService: CountryDataService,
    private formSubmitService: FormSubmitService) {}

  ngOnInit(): void {
    this.formConfig = new FormConfig({
      id: 'auth.register',
      showRequired: true,
      submitService: this.formSubmitService,
      submitTarget: '/auth/register',
      groups: [
        this.personalDataGroup(),
        this.userCredentialsGroup(),
        this.addressGroup()
      ],
      validators: [
        equalValueValidator('credentials.password', 'credentials.passwordConfirm'),
        equalValueValidator('credentials.email', 'credentials.emailConfirm')
      ],
      buttons: this.submitCancelButtons(),
      links: []
    });
  }
  
  private personalDataGroup():FormGroupConfig {
    let group = new FormGroupConfig({
      caption: 'personalData',
      captionVisible: true,
      controls: [],
      order: 0
    });
    group.controls.push(
      new FormControlSelectInputConfig<Title>({
        type: 'select',
        key: 'title',
        validation: this.validation('title').setRequired(),
        data: {
          options: [
            { key: 'male', value: Title.Mr},
            { key: 'female', value: Title.Ms}
          ]
        },
        selection: { current: Title.Mr, index: 0 },
        order: 0
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'firstName',
        validation: this.validation('firstName').setRequired(),
        order: 1
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'middleName',
        validation: this.validation('middleName'),
        order: 2
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'lastName',
        validation: this.validation('lastName').setRequired(),
        order: 3
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'birthday',
        validation: this.validation('birthday').setRequired(),
        order: 4
      }),
      new FormControlSelectInputConfig<Sex>({
        type: 'select',
        key: 'sex',
        validation: this.validation('sex').setRequired(),
        order: 5,
        data: {
          options: [
            { key: 'male', value: Sex.Male},
            { key: 'female', value: Sex.Female},
            { key: 'other', value: Sex.Other}
          ]
        },
        selection: { current: Title.Mr, index: 1 },
      })
    );
    return group;
  };
  
  private userCredentialsGroup():FormGroupConfig {
    let group = new FormGroupConfig({
      caption: 'credentials',
      captionVisible: true,
      controls: [],
      order: 1
    });
    group.controls.push(
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'username',
        validation: this.validation('username').setRequired().setMinLength(4),
        order: 0
      }),
      new FormControlGenericInputConfig({
        type: 'password',
        key: 'password',
        validation: this.validation('password').setRequired(),
        order: 1
      }),
      new FormControlGenericInputConfig({
        type: 'password',
        key: 'passwordConfirm',
        validation: this.validation('passwordConfirm').setRequired(),
        order: 2
      }),
      new FormControlGenericInputConfig({
        type: 'email',
        key: 'email',
        validation: this.validation('email').setRequired().setEmail(),
        order: 3
      }),
      new FormControlGenericInputConfig({
        type: 'email',
        key: 'emailConfirm',
        validation: this.validation('emailConfirm').setRequired().setEmail(),
        order: 4
      })
    );
    return group;
  }
  
  private addressGroup():FormGroupConfig {
    let group = new FormGroupConfig({
      caption: 'address',
      captionVisible: true,
      controls: [],
      order: 3
    });
    group.controls.push(
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'street1',
        validation: this.validation('street1').setRequired(),
        order: 0
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'street2',
        validation: this.validation('street2'),
        order: 1
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'city',
        validation: this.validation('city').setRequired(),
        order: 2
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'state',
        validation: this.validation('state').setRequired(),
        order: 3
      }),
      new FormControlAutocompleteInputConfig<string>({
        type: 'autocomplete',
        key: 'country',
        validation: this.validation('country').setRequired(),
        data: { options: [] },
        selection: { current: '', index: -1 },
        order: 4,
        dataService: this.countryDataService
      })
    );
    return group;
  }
  
  private submitCancelButtons():FormXtraButtonConfig[] {
    return [
      new FormXtraButtonConfig({
        type: 'submit',
        key: 'register',
        validate: true,
        orientation: Direction.Left
      }),
      new FormXtraButtonConfig({
        type: 'button',
        key: 'cancel',
        validate: false,
        orientation: Direction.Right
      })
    ];
  }
  
  private validation(control: string) {
    return new FormControlValidationMap(control);
  }
}
