import { Component, OnInit } from '@angular/core';

import { FormElementButton } from '../../_ui/form/elements/form.element.button';
import { FormElementInputText } from "../../_ui/form/elements/form.element.input.text";
import { FormElementInputPassword } from "../../_ui/form/elements/form.element.input.password";
import { FormElementLink } from "../../_ui/form/elements/form.element.link";
import { FormConfig } from "../../_ui/form/form.config";
import {FormElementInputEmail} from "../../_ui/form/elements/form.element.input.email";

@Component({
  selector: 'tmt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formConfig: FormConfig;

  constructor() {}

  ngOnInit(): void {
    this.formConfig = new FormConfig({
      id: 'register',
      text: 'massive.register',
      groups: [
        { //Full Name & Email
          caption: 'name.email',
          captionVisible: true,
          elements: [
            new FormElementInputText({
              key: '1stname',
              required: true,
              order: 1
            }),
            new FormElementInputText({
              key: '2ndname',
              required: true,
              order: 2
            }),
            new FormElementInputEmail({
              key: 'email',
              required: true,
              order: 3
            }),
            new FormElementInputEmail({
              key: 'email.confirm',
              required: true,
              order: 4
            }),
          ]
        },
        { //User Credentials
          caption: 'credentials',
          captionVisible: true,
          elements: [
            new FormElementInputText({
              key: 'username',
              required: true,
              order: 5
            }),
            new FormElementInputPassword({
              key: 'password',
              required: true,
              order: 6
            }),
            new FormElementInputPassword({
              key: 'password.confirm',
              required: true,
              order: 7
            })
          ]
        },
        { //Adress
          caption: 'adress',
          captionVisible: true,
          elements: [
            new FormElementInputText({
              key: 'street1',
              required: true,
              order: 8
            }),
            new FormElementInputText({
              key: 'street2',
              required: true,
              order: 9
            }),
            new FormElementInputText({
              key: 'city',
              required: true,
              order: 10
            }),
            new FormElementInputText({
              key: 'state',
              required: true,
              order: 11
            }),
            new FormElementInputText({
              key: 'postal',
              required: true,
              order: 12
            }),
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
      ],
      links: [
        new FormElementLink({
          key: 'forgotten',
          href: 'auth/forgotten',
          order: 5,
          orientation: 'left'
        }),
        new FormElementLink({
          key: 'register',
          href: 'auth/register',
          order: 6,
          orientation: 'right'
        })
      ]
    });
  }
}
