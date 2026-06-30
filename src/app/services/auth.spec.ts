import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });

    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debería iniciar sesión con credenciales válidas de administrador', () => {
    const resultado = service.login('admin', 'Admin12345');

    expect(resultado).toBeTruthy();
    expect(service.estaLogueado()).toBeTruthy();
    expect(service.esAdmin()).toBeTruthy();
    expect(service.sesion()?.usuario).toBe('admin');
    expect(service.sesion()?.rol).toBe('admin');
  });

  it('debería rechazar una contraseña incorrecta', () => {
    const resultado = service.login('admin', 'ClaveIncorrecta123!');

    expect(resultado).toBeFalsy();
    expect(service.estaLogueado()).toBeFalsy();
    expect(service.sesion()).toBeNull();
  });

  it('debería rechazar un usuario inexistente', () => {
    const resultado = service.login('usuario_inventado', 'Admin12345');

    expect(resultado).toBeFalsy();
    expect(service.estaLogueado()).toBeFalsy();
    expect(service.sesion()).toBeNull();
  });

  it('debería registrar un usuario nuevo y dejarlo con sesión activa', () => {
    const resultado = service.registrar({
      usuario: 'cliente_test',
      clave: 'Cliente123!',
      rol: 'usuario',
      nombreCompleto: 'Cliente Test',
      correo: 'cliente@test.cl',
      fechaNacimiento: '1995-05-20',
      calle: 'Av. Prueba',
      numero: '123',
      deptoCasa: 'Depto 1',
      comuna: 'Santiago',
      region: 'Metropolitana de Santiago'
    });

    expect(resultado).toBeTruthy();
    expect(service.estaLogueado()).toBeTruthy();
    expect(service.esAdmin()).toBeFalsy();
    expect(service.sesion()?.usuario).toBe('cliente_test');
    expect(service.sesion()?.rol).toBe('usuario');
  });

  it('no debería permitir registrar un usuario duplicado', () => {
    const resultado = service.registrar({
      usuario: 'admin',
      clave: 'OtraClave123!',
      rol: 'usuario',
      nombreCompleto: 'Usuario Duplicado',
      correo: 'duplicado@test.cl',
      fechaNacimiento: '1995-05-20',
      calle: 'Av. Prueba',
      numero: '123',
      deptoCasa: 'Casa',
      comuna: 'Santiago',
      region: 'Metropolitana de Santiago'
    });

    expect(resultado).toBeFalsy();
  });
});