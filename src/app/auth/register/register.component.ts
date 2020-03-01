import { Component, OnInit } from '@angular/core';

import { Sex, Title } from '../../_data/_enums';
import { CountryDataService } from '../../_ui/form/services/country.data.service';
import { FormElementButton } from '../../_ui/form/elements/form.element.button';
import { FormElementInputText } from "../../_ui/form/elements/form.element.input.text";
import { FormElementInputPassword } from "../../_ui/form/elements/form.element.input.password";
import { FormElementInputEmail } from "../../_ui/form/elements/form.element.input.email";
import { FormElementInputDate } from "../../_ui/form/elements/form.element.input.date";
import { FormElementInputAutocomplete } from '../../_ui/form/elements/form.element.input.autocomplete';
import { FormElementInputSelect } from '../../_ui/form/elements/form.element.input.select';
import { FormComponentConfig } from "../../_ui/form/config/form.component.config";
import { FormControlGroupConfig } from '../../_ui/form/config/form.control.group.config';
import { FormSubmitService } from "../../_ui/form/services/form.submit.service";
import { required } from "../../_ui/form/config/form.control.validation.config";

@Component({
  selector: 'tmt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formConfig: FormComponentConfig;

  constructor(
    private countryDataService: CountryDataService,
    private formSubmitService: FormSubmitService) {}

  ngOnInit(): void {
    this.formConfig = new FormComponentConfig({
      config: {
        id: 'auth.register',
        showRequired: true,
        submitService: this.formSubmitService,
        submitTarget: '/auth/register',
      },
      groups: [
        this.personalDataGroup(),
        this.userCredentialsGroup(),
        this.addressGroup()
      ],
      buttons: this.submitCancelButtons()
    });
  }
  
  private personalDataGroup() {
    return new FormControlGroupConfig({
      caption: 'personal.data',
      captionVisible: true,
      elements: [
        new FormElementInputSelect<Title, string>({
          key: 'title',
          order: 1,
          validators: [
            required()
          ],
        }, [
          {key: Title.Mr, value: Title.Mr},
          {key: Title.Ms, value: Title.Ms},
        ]),
        new FormElementInputText({
          key: 'first.name',
          order: 2,
          validators: [
            required()
          ],
        }),
        new FormElementInputText({
          key: 'middle.name',
          order: 3,
          validators: [],
        }),
        new FormElementInputText({
          key: 'last.name',
          order: 4,
          validators: [
            required()
          ],
        }),
        new FormElementInputDate({
          key: 'birthday',
          order: 5,
          validators: [
            required()
          ],
        }),
        new FormElementInputSelect<Sex, string>({
          key: 'sex',
          order: 6,
          validators: [
            required()
          ],
        }, [
          {key: Sex.Male, value: Sex.Male},
          {key: Sex.Female, value: Sex.Female},
          {key: Sex.Other, value: Sex.Other}
        ])
      ]
    });
  }
  
  private userCredentialsGroup() {
    return new FormControlGroupConfig({ //User Credentials
      caption: 'credentials',
      captionVisible: true,
      elements: [
        new FormElementInputText({
          key: 'username',
          order: 1,
          validators: [
            required()
          ],
        }),
        new FormElementInputPassword({
          key: 'password',
          order: 2,
          validators: [
            required()
          ],
        }),
        new FormElementInputPassword({
          key: 'password.confirm',
          order: 3,
          validators: [
            required()
          ],
        }),
        new FormElementInputEmail({
          key: 'email',
          order: 4,
          validators: [
            required()
          ],
        }),
        new FormElementInputEmail({
          key: 'email.confirm',
          order: 5,
          validators: [
            required()
          ],
        }),
      ]
    });
  }
  
  private addressGroup() {
    return new FormControlGroupConfig({ //Adress
      caption: 'address',
      captionVisible: true,
      elements: [
        new FormElementInputText({
          key: 'street1',
          order: 1,
          validators: [
            required()
          ],
        }),
        new FormElementInputText({
          key: 'street2',
          order: 2,
          validators: [],
        }),
        new FormElementInputText({
          key: 'city',
          order: 3,
          validators: [
            required()
          ],
        }),
        new FormElementInputText({
          key: 'state',
          order: 4,
          validators: [
            required()
          ],
        }),
        new FormElementInputText({
          key: 'postal',
          order: 5,
          validators: [
            required()
            ],
        }),
        new FormElementInputAutocomplete({
          key: 'country',
          order: 6,
          validators: [
            required()
          ],
        }, this.countryDataService)
      ]
    });
  }
  
  private submitCancelButtons() {
    return [
      new FormElementButton({
        key: 'register',
        validate: true,
        order: 1,
        type: 'submit',
        orientation: 'left'
      }),
      new FormElementButton({
        key: 'cancel',
        validate: false,
        order: 2,
        type: 'button',
        orientation: 'right'
      })
    ];
  }
}
