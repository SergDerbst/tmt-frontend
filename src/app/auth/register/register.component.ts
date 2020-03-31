import {Component, OnInit} from '@angular/core';

import {DateTimeUnit, Direction, Sex, Title, UserRole} from '../../_data/_enums';
import {CountryDataService} from '../../_ui/form/services/data/country.data.service';
import {FormGroupConfig} from '../../_ui/form/config/form.group.config';
import {FormSubmitService} from "../../_ui/form/services/form.submit.service";
import {FormConfig} from "../../_ui/form/config/form.config";
import {FormControlSelectInputConfig} from "../../_ui/form/config/controls/impl/form.control.select.input.config";
import {FormControlGenericInputConfig} from "../../_ui/form/config/controls/impl/form.control.generic.input.config";
import {FormControlAutocompleteInputConfig} from "../../_ui/form/config/controls/impl/form.control.autocomplete.input.config";
import {FormXtraButtonConfig} from "../../_ui/form/config/xtras/impl/form.xtra.button.config";
import {equalValueValidator} from "../../_ui/form/config/controls/validation/form.group.validation";
import {validation} from "../../_ui/form/config/controls/form.control.config";
import {HighlightableStringValue} from "../../_ui/form/config/controls/form.control.data.config";
import {FormControlDateInputConfig} from "../../_ui/form/config/controls/impl/form.control.date.input.config";
import {User} from "../_data/authenticated";
import {AppConfigService} from "../../app.config.service";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'tmt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formConfig: FormConfig;

  constructor(
    private appConfigService: AppConfigService,
    private authenticationService: AuthenticationService,
    private countryDataService: CountryDataService,
    private formSubmitService: FormSubmitService) {}

  ngOnInit(): void {
    this.formConfig = new FormConfig({
      id: 'auth.register',
      showRequired: true,
      submit: (user: User, path:string, method?:string) => {
        user.preferredLanguage = this.appConfigService.appLanguage();
        this.formSubmitService.submit(user, path, method).subscribe(data => {
          //twiddle your thumbs, bitch
        });
      },
      submitTarget: '/auth/register',
      groups: [
        this.personalDataGroup(),
        this.userCredentialsGroup(),
        //this.addressGroup()
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
        validation: validation('title').setRequired(),
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
        validation: validation('firstName').setRequired(),
        order: 1
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'middleName',
        validation: validation('middleName'),
        order: 2
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'lastName',
        validation: validation('lastName').setRequired(),
        order: 3
      }),
      new FormControlDateInputConfig({
        type: 'date',
        key: 'dayOfBirth',
        validation: validation('dayOfBirth').setRequired()
                                                 .setDate({
                                                   future: false,
                                                   minPast: { unit: DateTimeUnit.year, value: 14 },
                                                   maxPast: { unit: DateTimeUnit.year, value: 120 }
                                                 }),
        order: 4
      }),
      new FormControlSelectInputConfig<Sex>({
        type: 'select',
        key: 'sex',
        validation: validation('sex').setRequired(),
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
        validation: validation('username')
          .setRequired()
          .setMinLength(4)
          .setUnique({
            url: '/auth/register/username/validate',
            fieldName: 'username',
            validationService: this.authenticationService
          }),
        order: 0
      }),
      new FormControlGenericInputConfig({
        type: 'email',
        key: 'email',
        validation: validation('email')
          .setRequired()
          .setEmail()
          .setUnique({
            url: '/auth/register/email/validate',
            fieldName: 'email',
            validationService: this.authenticationService
          }),
        order: 3
      }),
      new FormControlGenericInputConfig({
        type: 'email',
        key: 'emailConfirm',
        validation: validation('emailConfirm').setRequired().setEmail(),
        order: 4
      }),
      new FormControlGenericInputConfig({
        type: 'password',
        key: 'password',
        validation: validation('password').setRequired()
          .setMinLength(8)
          .setPassword('Lowercase')
          .setPassword('Uppercase')
          .setPassword('Numeric')
          .setPassword('Special'),
        order: 1
      }),
      new FormControlGenericInputConfig({
        type: 'password',
        key: 'passwordConfirm',
        validation: validation('passwordConfirm').setRequired(),
        order: 2
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
        validation: validation('street1').setRequired(),
        order: 0
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'street2',
        validation: validation('street2'),
        order: 1
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'city',
        validation: validation('city').setRequired(),
        order: 2
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'zipCode',
        validation: validation('zipCode').setRequired(),
        order: 2
      }),
      new FormControlGenericInputConfig({
        type: 'text',
        key: 'state',
        validation: validation('state').setRequired(),
        order: 3
      }),
      new FormControlAutocompleteInputConfig<HighlightableStringValue>({
        type: 'autocomplete',
        key: 'country',
        validation: validation('country').setRequired(),
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
}
