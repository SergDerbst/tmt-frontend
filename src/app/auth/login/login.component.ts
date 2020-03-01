import { Component, OnInit } from '@angular/core';

import { FormElementButton } from '../../_ui/form/elements/form.element.button';
import { FormElementInputText } from "../../_ui/form/elements/form.element.input.text";
import { FormElementInputPassword } from "../../_ui/form/elements/form.element.input.password";
import { FormElementLink } from "../../_ui/form/elements/form.element.link";
import { FormComponentConfig } from "../../_ui/form/config/form.component.config";
import { FormSubmitService } from "../../_ui/form/services/form.submit.service";
import { FormControlGroupConfig } from "../../_ui/form/config/form.control.group.config";

@Component({
  selector: 'tmt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formConfig: FormComponentConfig;

  constructor(private formSubmitService: FormSubmitService) {}

  ngOnInit(): void {
    this.formConfig = new FormComponentConfig({
      config: {
        id: 'auth.login',
        showRequired: true,
        submitService: this.formSubmitService,
        submitTarget: '/auth/register',
      },
      groups: [
        this.loginCredentials()
      ],
      buttons: this.submitCancelButtons(),
      links: this.forgotPasswordRegisterLinks()
    });
  }
  
  private loginCredentials() {
    return new FormControlGroupConfig({
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
    });
  }
  
  private submitCancelButtons() {
    return [
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
    ];
  }
  
  private forgotPasswordRegisterLinks() {
    return [
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
    ];
  }
}
