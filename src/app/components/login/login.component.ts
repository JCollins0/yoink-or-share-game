import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoginAction, SignUpAction } from 'src/app/actions/app.actions';
import { LoginConstants } from 'src/app/constants/app-constants';
import { CommonError, FormModel } from 'src/app/models/common';
import { selectLoginError, selectUser, State } from 'src/app/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private store: Store<State>, private fb: FormBuilder, private router: Router) {
    this.loginError$ = this.store.select(selectLoginError).pipe(filter((err) => !!err));
    this.user$ = this.store
      .select(selectUser)
      .pipe(filter((user) => !!user))
      .subscribe(() => {
        this.router.navigate(['dashboard']);
      });
  }

  LoginConstants = LoginConstants;

  public signInForm: FormGroup = this.fb.group({});
  public signUpForm: FormGroup = this.fb.group({});

  public formParametersSignUp!: FormModel;
  public formParametersSignIn!: FormModel;

  public isNewUserView: boolean = false;

  public loginError$: Observable<CommonError | null>;
  private user$: Subscription;

  ngOnInit(): void {
    this.formParametersSignUp = [
      {
        id: 'username',
        type: 'text',
        label: LoginConstants.usernameLabel,
        autocomplete: 'username',
        validators: [
          {
            key: 'required',
            func: Validators.required,
            msg: LoginConstants.usernameRequired,
          },
          {
            key: 'minlength',
            func: Validators.minLength(4),
            msg: LoginConstants.usernameMinLength,
          },
          {
            key: 'maxlength',
            func: Validators.maxLength(20),
            msg: LoginConstants.usernameMaxLength,
          },
        ],
      },
      {
        id: 'password',
        type: 'password',
        label: LoginConstants.passwordLabel,
        autocomplete: 'new-password',
        validators: [
          {
            key: 'required',
            func: Validators.required,
            msg: LoginConstants.passwordRequired,
          },
          {
            key: 'minlength',
            func: Validators.minLength(8),
            msg: LoginConstants.passwordMinLength,
          },
          {
            key: 'maxlength',
            func: Validators.maxLength(20),
            msg: LoginConstants.passwordMaxLength,
          },
        ],
      },
      {
        id: 'confirmPassword',
        type: 'password',
        label: LoginConstants.confirmPasswordLabel,
        validators: [
          {
            key: 'matchfield',
            func: this.fieldsMustBeSame('password', this.signUpForm),
            msg: LoginConstants.passwordMustMatch,
          },
        ],
      },
    ];

    this.formParametersSignIn = [
      {
        id: 'username',
        type: 'text',
        label: LoginConstants.usernameLabel,
        autocomplete: 'username',
        validators: [
          {
            key: 'required',
            func: Validators.required,
            msg: LoginConstants.usernameRequired,
          },
          {
            key: 'minlength',
            func: Validators.minLength(4),
            msg: LoginConstants.usernameMinLength,
          },
          {
            key: 'maxlength',
            func: Validators.maxLength(20),
            msg: LoginConstants.usernameMaxLength,
          },
        ],
      },
      {
        id: 'password',
        type: 'password',
        label: LoginConstants.passwordLabel,
        autocomplete: 'new-password',
        validators: [
          {
            key: 'required',
            func: Validators.required,
            msg: LoginConstants.passwordRequired,
          },
          {
            key: 'minlength',
            func: Validators.minLength(8),
            msg: LoginConstants.passwordMinLength,
          },
          {
            key: 'maxlength',
            func: Validators.maxLength(20),
            msg: LoginConstants.passwordMaxLength,
          },
        ],
      },
    ];

    this.formParametersSignUp.forEach((param) => {
      this.signUpForm.addControl(
        param.id,
        this.fb.control(
          '',
          param.validators.map((elem) => elem.func)
        )
      );
    });

    this.formParametersSignIn.forEach((param) => {
      this.signInForm.addControl(
        param.id,
        this.fb.control(
          '',
          param.validators.map((elem) => elem.func)
        )
      );
    });
  }

  public swapBetweenSignInAndSignUp() {
    this.signInForm.reset();
    this.signUpForm.reset();
    this.isNewUserView = !this.isNewUserView;
  }

  public onSignInSubmit() {
    var payload = {
      credentials: {
        username: this.signInForm.get('username')?.value,
        password: this.signInForm.get('password')?.value,
      },
    };
    this.store.dispatch(LoginAction(payload));
  }

  public onSignUpSubmit() {
    var payload = {
      credentials: {
        username: this.signUpForm.get('username')?.value,
        password: this.signUpForm.get('password')?.value,
      },
    };
    this.store.dispatch(SignUpAction(payload));
  }

  private fieldsMustBeSame(otherControlName: string, form: FormGroup): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let otherControl = form.get(otherControlName);
      if (!otherControl) {
        return null;
      }
      const matchfield = otherControl.value !== control.value;
      return matchfield ? { matchfield: { value: control.value } } : null;
    };
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe;
  }
}
