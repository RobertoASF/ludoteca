import { FormControl, FormGroup } from '@angular/forms';

import {
  matchingPasswordsValidator,
  notFutureDateValidator,
  passwordStrengthValidator
} from './password.validators';

describe('Validadores de formularios', () => {
  it('debería aceptar una contraseña segura', () => {
    const control = new FormControl('ClaveSegura1!');
    const validator = passwordStrengthValidator();

    const result = validator(control);

    expect(result).toBeNull();
  });

  it('debería rechazar una contraseña sin mayúscula', () => {
    const control = new FormControl('clavesegura1!');
    const validator = passwordStrengthValidator();

    const result = validator(control);

    expect(result?.['passwordUppercase']).toBeTruthy();
  });

  it('debería rechazar una contraseña sin número ni carácter especial', () => {
    const control = new FormControl('ClaveSegura');
    const validator = passwordStrengthValidator();

    const result = validator(control);

    expect(result?.['passwordNumber']).toBeTruthy();
    expect(result?.['passwordSpecial']).toBeTruthy();
  });

  it('debería detectar cuando las contraseñas no coinciden', () => {
    const form = new FormGroup(
      {
        clave: new FormControl('ClaveSegura1!'),
        repetirClave: new FormControl('OtraClave1!')
      },
      {
        validators: matchingPasswordsValidator('clave', 'repetirClave')
      }
    );

    expect(form.errors?.['passwordMismatch']).toBeTruthy();
  });

  it('debería rechazar una fecha futura', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const control = new FormControl(tomorrow.toISOString().split('T')[0]);
    const validator = notFutureDateValidator();

    const result = validator(control);

    expect(result?.['futureDate']).toBeTruthy();
  });
});