import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../models/usurio.model.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_SESSION = 'ludotecaSesion';
  private readonly STORAGE_PROFILES = 'ludotecaPerfiles';

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private isBrowser = isPlatformBrowser(this.platformId);

  sesion = signal<Usuario | null>(null);

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

  constructor() {
    if (this.isBrowser) {
      this.obtenerPerfiles();
      this.sesion.set(this.obtenerSesion());
    }
  }

  obtenerPerfiles(): Record<string, Usuario> {
    if (!this.isBrowser) {
      return {};
    }

    const guardados = JSON.parse(
      localStorage.getItem(this.STORAGE_PROFILES) || '{}'
    );

    this.usuariosBase.forEach(usuario => {
      if (!guardados[usuario.usuario]) {
        guardados[usuario.usuario] = usuario;
      }
    });

    localStorage.setItem(this.STORAGE_PROFILES, JSON.stringify(guardados));

    return guardados;
  }

  guardarPerfiles(perfiles: Record<string, Usuario>): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(this.STORAGE_PROFILES, JSON.stringify(perfiles));
  }

  obtenerSesion(): Usuario | null {
    if (!this.isBrowser) {
      return null;
    }

    return JSON.parse(localStorage.getItem(this.STORAGE_SESSION) || 'null');
  }

  guardarSesion(usuario: Usuario): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(this.STORAGE_SESSION, JSON.stringify(usuario));
    this.sesion.set(usuario);
  }

  login(usuarioTexto: string, claveTexto: string): boolean {
    if (!this.isBrowser) {
      return false;
    }
  
    const perfiles = this.obtenerPerfiles();
  
    const username = usuarioTexto.trim().toLowerCase();
    const clave = claveTexto.trim();
  
    const usuario = perfiles[username];
  
    if (!usuario) {
      return false;
    }
  
    if (usuario.clave !== clave) {
      return false;
    }
  
    this.guardarSesion(usuario);
  
    return true;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_SESSION);
    }

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
    if (!this.isBrowser) {
      return false;
    }

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
    this.guardarSesion(perfiles[username]);

    return true;
  }

  actualizarPerfil(data: Partial<Usuario>): void {
    if (!this.isBrowser) {
      return;
    }

    const sesionActual = this.sesion();

    if (!sesionActual) {
      return;
    }

    const perfiles = this.obtenerPerfiles();
    const perfilActual = perfiles[sesionActual.usuario];

    perfiles[sesionActual.usuario] = {
      ...perfilActual,
      ...data,
      usuario: sesionActual.usuario
    };

    this.guardarPerfiles(perfiles);
    this.guardarSesion(perfiles[sesionActual.usuario]);
  }

  cantidadUsuarios(): number {
    if (!this.isBrowser) {
      return this.usuariosBase.length;
    }

    return Object.keys(this.obtenerPerfiles()).length;
  }
}