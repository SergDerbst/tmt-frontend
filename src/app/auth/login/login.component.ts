import {Component, OnInit} from '@angular/core';

import {FormSubmitService} from "../../_ui/form/services/form.submit.service";
import {FormConfig} from "../../_ui/form/config/form.config";
import {FormGroupConfig} from "../../_ui/form/config/form.group.config";
import {FormControlGenericInputConfig} from "../../_ui/form/config/controls/impl/form.control.generic.input.config";
import {validation} from "../../_ui/form/config/controls/form.control.config";
import {FormXtraButtonConfig} from "../../_ui/form/config/xtras/impl/form.xtra.button.config";
import {Direction} from "../../_data/_enums";
import {FormXtraLinkConfig} from "../../_ui/form/config/xtras/impl/form.xtra.link.config";

@Component({
  selector: 'tmt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formConfig: FormConfig;

  constructor(private formSubmitService: FormSubmitService) {}

  ngOnInit(): void {
    this.formConfig = new FormConfig({
      id: 'auth.login',
      showRequired: true,
      submitService: this.formSubmitService,
      submitTarget: '/auth/register',
      groups: [
        this.loginCredentials()
      ],
      buttons: this.submitCancelButtons(),
      links: this.forgotPasswordRegisterLinks()
    });
  }
  private loginCredentials():FormGroupConfig {
    let group = new FormGroupConfig({
      caption: 'credentials',
      captionVisible: true,
      controls: [],
      order: 0
    });
    group.controls.push(new FormControlGenericInputConfig({
        type: 'text',
        key: 'username',
        validation: validation('username').setRequired(),
          order: 1
        }),
        new FormControlGenericInputConfig({
          type: 'password',
          key: 'password',
          validation: validation('password').setRequired(),
          order: 2
        }
      )
    );
    return group;
  }
  
  private submitCancelButtons():FormXtraButtonConfig[] {
    return [
      new FormXtraButtonConfig({
        type: 'submit',
        key: 'login',
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
  
  private forgotPasswordRegisterLinks() {
    return [
      new FormXtraLinkConfig({
        key: 'forgotten',
        href: 'auth/forgotten',
        orientation: Direction.Left
      }),
      new FormXtraLinkConfig({
        key: 'register',
        href: 'auth/register',
        orientation: Direction.Right
      })
    ];
  }
}
