import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { LoginAction, SignUpAction } from 'src/app/actions/app.actions';
import { FormModel, FormModelParameters } from 'src/app/models/common';
import { getLoginError, selectUser, State } from 'src/app/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store : Store<State>, private fb : FormBuilder,private router: Router) { }

  public signInForm: FormGroup = this.fb.group({});
  public signUpForm: FormGroup = this.fb.group({});

  public formParametersSignUp! : FormModel;
  public formParametersSignIn! : FormModel;

  public isNewUserView : boolean = false;

  public errorMsg : string | null = null;

  ngOnInit(): void {
    this.formParametersSignUp = [
      {
        id : 'username',
        type: 'text',
        label : 'Username: ',
        autocomplete : 'username',
        validators : [
          {
            key : 'required',
            func : Validators.required,
            msg : "Username is required" 
          },
          {
            key : 'minlength',
            func : Validators.minLength(4),
            msg : "Username must be at least 4 characters" 
          },
          {
            key : 'maxlength',
            func : Validators.maxLength(20),
            msg : "Username can be at most 20 characters" 
          }
        ]
      },
      {
        id : 'password',
        type: 'password',
        label : 'Password: ',
        autocomplete : 'new-password',
        validators : [
          {
            key : 'required',
            func : Validators.required,
            msg : "Password is required" 
          },
          {
            key : 'minlength',
            func : Validators.minLength(8),
            msg : "Password must be at least 8 characters" 
          },
          {
            key : 'maxlength',
            func : Validators.maxLength(20),
            msg : "Password can be at most 20 characters" 
          }
        ]
      },
      {
        id : 'confirmPassword',
        type: 'password',
        label : 'Confirm Password: ',
        validators : [
          {
            key : 'matchfield',
            func : this.fieldsMustBeSame('password',this.signUpForm),
            msg : "Passwords must match"
          }
        ]
      }
    ]

    this.formParametersSignIn = [
      {
        id : 'username',
        type: 'text',
        label : 'Username: ',
        autocomplete : 'username',
        validators : [
          {
            key : 'required',
            func : Validators.required,
            msg : "Username is required" 
          },
          {
            key : 'minlength',
            func : Validators.minLength(4),
            msg : "Username must be at least 4 characters" 
          },
          {
            key : 'maxlength',
            func : Validators.maxLength(20),
            msg : "Username can be at most 20 characters" 
          }
        ]
      },
      {
        id : 'password',
        type: 'password',
        label : 'Password: ',
        autocomplete : 'current-password',
        validators : [
          {
            key : 'required',
            func : Validators.required,
            msg : "Password is required" 
          },
          {
            key : 'minlength',
            func : Validators.minLength(8),
            msg : "Password must be at least 8 characters" 
          },
          {
            key : 'maxlength',
            func : Validators.maxLength(20),
            msg : "Password can be at most 20 characters" 
          }
        ]
      }
    ]

    this.formParametersSignUp.forEach(param => {
      this.signUpForm.addControl(param.id, this.fb.control("", param.validators.map( elem => elem.func)));
    })

    this.formParametersSignIn.forEach(param => {
      this.signInForm.addControl(param.id, this.fb.control("", param.validators.map( elem => elem.func)));
    })

    this.store.select(getLoginError).pipe(
        filter(err=>!!err)
      ).subscribe(err => {
      if(err){
        console.log(err)
        this.errorMsg = err.error;
        setTimeout( ()=> this.errorMsg = null, 5000);
      }
    })

    this.store.select(selectUser).pipe(
      filter(user => !!user)
    ).subscribe(() =>{
      this.router.navigate(['home'])
    })   
  }

  public swapBetweenSignInAndSignUp(){
    this.signInForm.reset();
    this.signUpForm.reset();
    this.isNewUserView = !this.isNewUserView
  }

  public onSignInSubmit(){
    var payload = {
      credentials : {
        username: this.signInForm.get('username')?.value,
        password: this.signInForm.get('password')?.value
      }
    }
    this.store.dispatch(LoginAction(payload))
    this.store.dispatch(LoginAction(payload))
  }

  public onSignUpSubmit(){
    var payload = {
      credentials : {
        username: this.signUpForm.get('username')?.value,
        password: this.signUpForm.get('password')?.value
      }
    }
    this.store.dispatch(SignUpAction(payload))
  }


  private fieldsMustBeSame(otherControlName: string, form : FormGroup): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let otherControl = form.get(otherControlName)
      if(!otherControl) {return null}
      const matchfield = otherControl.value !== control.value;
      return matchfield ? {matchfield: {value: control.value}} : null;
    };
  }
}
