import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usurio.model.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_SESSION = 'ludotecaSesion';
  private readonly STORAGE_PROFILES = 'ludotecaPerfiles';

  private usuariosBase: Usuario[] = [
    {
      usuario: 'usuario',
      clave: 'Usuario1234',
      rol: 'usuario',
      nombreCompleto: 'Usuario Demo',
      correo: 'usuario@ludotecaroberto.cl',
      fechaNacimiento: '1998-06-12',
      calle: 'Av. Providencia',
      numero: '1234',
      deptoCasa: 'Depto 404',
      comuna: 'Santiago',
      region: 'Metropolitana de Santiago'
    },
    {
      usuario: 'roberto',
      clave: 'Ludoteca2026',
      rol: 'usuario',
      nombreCompleto: 'Roberto Sánchez',
      correo: 'roberto.asf@gmail.com',
      fechaNacimiento: '1990-01-01',
      calle: 'Av. Principal',
      numero: '100',
      deptoCasa: 'Casa A',
      comuna: 'San Joaquín',
      region: 'Metropolitana de Santiago'
    },
    {
      usuario: 'admin',
      clave: 'Admin12345',
      rol: 'admin',
      nombreCompleto: 'Administrador Ludoteca',
      correo: 'admin@ludotecaroberto.cl',
      fechaNacimiento: '1990-01-01',
      calle: 'Oficina Central',
      numero: '1',
      deptoCasa: 'Local',
      comuna: 'Santiago',
      region: 'Metropolitana de Santiago'
    }
  ];

  sesion = signal<Usuario | null>(this.obtenerSesion());

  constructor(private router: Router) {
    this.obtenerPerfiles();
  }

  obtenerPerfiles(): Record<string, Usuario> {
    const guardados = JSON.parse(localStorage.getItem(this.STORAGE_PROFILES) || '{}');

    this.usuariosBase.forEach(usuario => {
      if (!guardados[usuario.usuario]) {
        guardados[usuario.usuario] = usuario;
      }
    });

    localStorage.setItem(this.STORAGE_PROFILES, JSON.stringify(guardados));
    return guardados;
  }

  guardarPerfiles(perfiles: Record<string, Usuario>): void {
    localStorage.setItem(this.STORAGE_PROFILES, JSON.stringify(perfiles));
  }

  obtenerSesion(): Usuario | null {
    return JSON.parse(localStorage.getItem(this.STORAGE_SESSION) || 'null');
  }

  login(usuarioTexto: string, claveTexto: string): boolean {
    const perfiles = this.obtenerPerfiles();
    const usuario = perfiles[usuarioTexto.trim().toLowerCase()];

    if (!usuario || usuario.clave !== claveTexto.trim()) {
      return false;
    }

    localStorage.setItem(this.STORAGE_SESSION, JSON.stringify(usuario));
    this.sesion.set(usuario);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_SESSION);
    this.sesion.set(null);
    this.router.navigateByUrl('/');
  }

  estaLogueado(): boolean {
    return this.sesion() !== null;
  }

  esAdmin(): boolean {
    return this.sesion()?.rol === 'admin';
  }

  registrar(usuario: Usuario): boolean {
    const perfiles = this.obtenerPerfiles();
    const username = usuario.usuario.trim().toLowerCase();

    if (perfiles[username]) {
      return false;
    }

    perfiles[username] = {
      ...usuario,
      usuario: username,
      rol: 'usuario'
    };

    this.guardarPerfiles(perfiles);
    localStorage.setItem(this.STORAGE_SESSION, JSON.stringify(perfiles[username]));
    this.sesion.set(perfiles[username]);

    return true;
  }

  actualizarPerfil(data: Partial<Usuario>): void {
    const sesionActual = this.sesion();
    if (!sesionActual) return;

    const perfiles = this.obtenerPerfiles();
    perfiles[sesionActual.usuario] = {
      ...perfiles[sesionActual.usuario],
      ...data,
      usuario: sesionActual.usuario
    };

    this.guardarPerfiles(perfiles);
    localStorage.setItem(this.STORAGE_SESSION, JSON.stringify(perfiles[sesionActual.usuario]));
    this.sesion.set(perfiles[sesionActual.usuario]);
  }
}