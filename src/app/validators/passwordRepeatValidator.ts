import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validator for password repeat fields
 * 
 * @autor Mokhtar Yosofzay
 *
 * @param passwordField
 */
export function passwordRepeatValidator(passwordValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = passwordValue;
        const passwordRepeat = control.getRawValue();

        return password !== passwordRepeat ? {passwordRepeat: {value: true}} : null;
    };
}
