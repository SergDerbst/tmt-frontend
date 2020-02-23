import { Component, OnInit } from '@angular/core';

import { Sex, Title } from '../../_data/_enums';
import { CountryDataService } from '../../_ui/form/services/country.data.service';
import { FormElementButton } from '../../_ui/form/elements/form.element.button';
import { FormElementInputText } from "../../_ui/form/elements/form.element.input.text";
import { FormElementInputPassword } from "../../_ui/form/elements/form.element.input.password";
import { FormElementInputEmail } from "../../_ui/form/elements/form.element.input.email";
import { FormElementInputAutocomplete } from '../../_ui/form/elements/form.element.input.autocomplete';
import { FormElementInputSelect } from '../../_ui/form/elements/form.element.input.select';
import { FormConfig } from "../../_ui/form/form.config";

@Component({
  selector: 'tmt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formConfig: FormConfig;

  constructor(private countryDataService: CountryDataService) {}

  ngOnInit(): void {
    this.formConfig = new FormConfig({
      id: 'auth.register',
      text: 'massive.register',
      markRequired: true,
      groups: [
        { //Personal Data
          caption: 'personal.data',
          captionVisible: true,
          elements: [
            new FormElementInputSelect<Title, string>({
              key: 'title',
              required: true,
              order: 1
            }, [
              { key: Title.Mr, value: Title.Mr },
              { key: Title.Ms, value: Title.Ms },
            ]),
            new FormElementInputText({
              key: 'first.name',
              required: true,
              order: 2
            }),
            new FormElementInputText({
              key: 'middle.name',
              required: false,
              order: 3
            }),
            new FormElementInputText({
              key: 'last.name',
              required: true,
              order: 4
            }),
            new FormElementInputText({
              key: 'birthday',
              required: true,
              order: 5
            }),
            new FormElementInputSelect<Sex, string>({
              key: 'sex',
              required: false,
              order: 6
            }, [
              { key: Sex.Male, value: Sex.Male },
              { key: Sex.Female, value: Sex.Female },
              { key: Sex.Other, value: Sex.Other }
            ])
          ]
        },
        { //User Credentials
          caption: 'credentials',
          captionVisible: true,
          elements: [
            new FormElementInputText({
              key: 'username',
              required: true,
              order: 1
            }),
            new FormElementInputPassword({
              key: 'password',
              required: true,
              order: 2
            }),
            new FormElementInputPassword({
              key: 'password.confirm',
              required: true,
              order: 3
            }),
            new FormElementInputEmail({
              key: 'email',
              required: true,
              order: 4
            }),
            new FormElementInputEmail({
              key: 'email.confirm',
              required: true,
              order: 5
            }),
          ]
        },
        { //Adress
          caption: 'address',
          captionVisible: true,
          elements: [
            new FormElementInputText({
              key: 'street1',
              required: true,
              order: 1
            }),
            new FormElementInputText({
              key: 'street2',
              required: false,
              order: 2
            }),
            new FormElementInputText({
              key: 'city',
              required: true,
              order: 3
            }),
            new FormElementInputText({
              key: 'state',
              required: true,
              order: 4
            }),
            new FormElementInputText({
              key: 'postal',
              required: true,
              order: 5
            }),
            new FormElementInputAutocomplete({
              key: 'country',
              required: true,
              order: 6
            }, this.countryDataService)
          ]
        }
      ],
      buttons: [
        new FormElementButton({
          key: 'login',
          validate: true,
          order: 3,
          type: 'submit',
          orientation: 'left'
        }),
        new FormElementButton({
          key: 'cancel',
          validate: false,
          order: 4,
          type: 'button',
          orientation: 'right'
        })
      ]
    });
  }
}
