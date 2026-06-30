import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login-modal',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css'
})
export class LoginModalComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  mensaje = '';

  form = this.fb.group({
    loginUsuario: ['', [Validators.required, Validators.minLength(4)]],
    loginClave: ['', [Validators.required, Validators.minLength(8)]],
    recordar: [false]
  });

  ingresar(): void {
    this.mensaje = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensaje = 'Ingresa un usuario y una contraseña válidos.';
      return;
    }

    const usuario = this.form.value.loginUsuario ?? '';
    const clave = this.form.value.loginClave ?? '';

    const loginCorrecto = this.auth.login(usuario, clave);

    if (!loginCorrecto) {
      this.mensaje = 'Usuario o contraseña incorrectos.';
      this.form.controls.loginClave.reset();
      return;
    }

    const sesion = this.auth.sesion();

    if (!sesion) {
      this.mensaje = 'No se pudo iniciar sesión.';
      return;
    }

    this.cerrarModal();

    if (sesion.rol === 'admin') {
      this.router.navigateByUrl('/admin/dashboard');
      return;
    }

    this.router.navigateByUrl('/perfil');
  }

  private cerrarModal(): void {
    const modalElement = document.getElementById('loginModal');

    if (!modalElement) {
      return;
    }

    const bootstrap = (window as any).bootstrap;

    if (!bootstrap) {
      return;
    }

    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide();
  }
}