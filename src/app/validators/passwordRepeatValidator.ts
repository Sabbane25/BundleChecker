import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validator for password repeat fields
 *
 * @param passwordField
 */
export function passwordRepeatValidator(passwordField: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = passwordField.getRawValue();
        const passwordRepeat = control.getRawValue();

        return password !== passwordRepeat ? {passwordRepeat: {value: true}} : null;
    };
}
