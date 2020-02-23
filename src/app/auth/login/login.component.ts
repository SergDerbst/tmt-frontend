import { Component, OnInit } from '@angular/core';

import { FormElementButton } from '../../_ui/form/elements/form.element.button';
import { FormElementInputText } from "../../_ui/form/elements/form.element.input.text";
import { FormElementInputPassword } from "../../_ui/form/elements/form.element.input.password";
import { FormElementLink } from "../../_ui/form/elements/form.element.link";
import { FormConfig } from "../../_ui/form/form.config";

@Component({
  selector: 'tmt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formConfig: FormConfig;

  constructor() {}

  ngOnInit(): void {
    this.formConfig = new FormConfig({
      id: 'auth.login',
      markRequired: false,
      groups: [
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
            })
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
