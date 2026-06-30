import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de seguridad para contraseñas.
 *
 * Reglas aplicadas:
 * - Longitud mínima de 8 caracteres.
 * - Longitud máxima de 20 caracteres.
 * - Al menos una letra mayúscula.
 * - Al menos una letra minúscula.
 * - Al menos un número.
 * - Al menos un carácter especial.
 * - No permite espacios en blanco.
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');

    if (!value) {
      return null;
    }

    const errors: ValidationErrors = {};

    if (value.length < 8) {
      errors['passwordMinLength'] = true;
    }

    if (value.length > 20) {
      errors['passwordMaxLength'] = true;
    }

    if (!/[A-ZÁÉÍÓÚÜÑ]/.test(value)) {
      errors['passwordUppercase'] = true;
    }

    if (!/[a-záéíóúüñ]/.test(value)) {
      errors['passwordLowercase'] = true;
    }

    if (!/[0-9]/.test(value)) {
      errors['passwordNumber'] = true;
    }

    if (!/[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/.test(value)) {
      errors['passwordSpecial'] = true;
    }

    if (/\s/.test(value)) {
      errors['passwordSpaces'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}

/**
 * Validador de formulario para comprobar que dos campos de contraseña coincidan.
 *
 * @param passwordField Nombre del campo principal de contraseña.
 * @param confirmPasswordField Nombre del campo de confirmación.
 */
export function matchingPasswordsValidator(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField)?.value;
    const confirmPassword = control.get(confirmPasswordField)?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

/**
 * Validador para evitar fechas futuras.
 * Se usa en campos como fecha de nacimiento.
 */
export function notFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const selectedDate = new Date(value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate > today ? { futureDate: true } : null;
  };
}