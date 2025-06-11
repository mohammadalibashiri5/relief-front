import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, map, switchMap, catchError, of } from 'rxjs';
import {RegisterService} from '../services/register.service';

export function usernameAvailableValidator(register: RegisterService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value || control.value.length === 0) {
      // skip async validation if empty
      return of(null);
    }
    return of(control.value).pipe(
      switchMap(username =>
        register.checkUsernameAvailability(username).pipe(
          map(isAvailable => (isAvailable ? null : { usernameTaken: true })),
          catchError(() => of(null)) // fail silently
        )
      )
    );
  };
}

export function emailAvailableValidator(register: RegisterService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value || control.value.length === 0) {
      // skip async validation if empty
      return of(null);
    }
    return of(control.value).pipe(
      switchMap(email =>
        register.checkEmailAvailability(email).pipe(
          map(isAvailable => (isAvailable ? null : { emailTaken: true })),
          catchError(() => of(null))
        )
      )
    );
  };
}
