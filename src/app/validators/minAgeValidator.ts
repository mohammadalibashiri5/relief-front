import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function ageRangeValidator(minAge: number, maxAge: number = 120): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (birthDate > today) {
      return { futureDate: true };
    }

    if (age < minAge) {
      return { minAge: { requiredAge: minAge, actualAge: age } };
    }

    if (age > maxAge) {
      return { maxAge: { maxAge: maxAge, actualAge: age } };
    }

    return null;
  };
}
