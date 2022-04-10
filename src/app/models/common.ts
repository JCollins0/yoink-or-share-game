import { ValidatorFn } from "@angular/forms";

export interface CommonError {
    error : string
}

export interface ValidatorMsgPairs{
    key : string
    func : ValidatorFn
    msg : string
}

export interface FormModelParameters{
    type: string
    id : string
    label : string
    autocomplete? : string
    required? : boolean
    validators : Array<ValidatorMsgPairs>
}

export type FormModel = Array<FormModelParameters>
