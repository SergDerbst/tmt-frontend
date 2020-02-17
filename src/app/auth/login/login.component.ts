import { Component, OnInit } from '@angular/core';

import { FormElementButton } from '../../_ui/form/elements/form.element.button';
import { FormElementInputText } from "../../_ui/form/elements/form.element.input.text";
import { FormElementInputPassword } from "../../_ui/form/elements/form.element.input.password";
import { FormElementLink } from "../../_ui/form/elements/form.element.link";

@Component({
  selector: 'tmt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formConfig = {
    caption: "Login to TooManyThoughts",
    elements: [
      new FormElementInputText({
        key: 'username',
        label: 'Username',
        required: true,
        order: 1
      }),
      new FormElementInputPassword({
        key: 'password',
        label: 'Password',
        required: true,
        order: 2
      })
    ],
    buttons: [
      new FormElementButton({
        key: 'login',
        label: 'Login',
        validate: true,
        order: 3,
        type: 'submit',
        orientation: 'left'
      }),
      new FormElementButton({
        key: 'cancel',
        label: 'Cancel',
        validate: false,
        order: 4,
        type: 'button',
        orientation: 'right'
      })
    ],
    links: [
      new FormElementLink({
        key: 'forgotten',
        label: 'Forgot Password?',
        href: 'auth/forgotten',
        order: 5
      }),
      new FormElementLink({
        key: 'register',
        label: 'Register',
        href: 'auth/register',
        order: 6
      })
    ]
  };

  constructor() {}

  ngOnInit(): void {
  }
}
