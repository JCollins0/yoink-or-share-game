import { ValidatorFn } from '@angular/forms';
import { User } from './user';

export interface CommonError {
  error: string;
}

export interface ValidatorMsgPairs {
  key: string;
  func: ValidatorFn;
  msg: string;
}

export interface FormModelParameters {
  type: string;
  id: string;
  label: string;
  autocomplete?: string;
  required?: boolean;
  validators: Array<ValidatorMsgPairs>;
}

export type FormModel = Array<FormModelParameters>;

export interface PermissionCheck {
  resource: string;
  action: string;
}

export interface Permission {
  resourceName: string;
  actions: Array<string>;
}

export type PermissionsMatrix = Array<Permission>;
