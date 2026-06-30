import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  usuarioActual = computed(() => this.auth.sesion());

  mensaje = '';
  mensajeError = '';

  form = this.fb.group({
    nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
    correo: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required],
    calle: ['', [Validators.required, Validators.minLength(3)]],
    numero: ['', [Validators.required]],
    deptoCasa: ['', Validators.required],
    comuna: ['', [Validators.required, Validators.minLength(3)]],
    region: ['', Validators.required]
  });

  constructor() {
    const usuario = this.auth.sesion();

    if (usuario) {
      this.form.patchValue({
        nombreCompleto: usuario.nombreCompleto,
        correo: usuario.correo,
        fechaNacimiento: usuario.fechaNacimiento,
        calle: usuario.calle,
        numero: usuario.numero,
        deptoCasa: usuario.deptoCasa,
        comuna: usuario.comuna,
        region: usuario.region
      });
    }
  }

  guardarCambios(): void {
    this.mensaje = '';
    this.mensajeError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensajeError = 'Revisa los campos del formulario antes de guardar.';
      return;
    }

    this.auth.actualizarPerfil({
      nombreCompleto: this.form.value.nombreCompleto ?? '',
      correo: this.form.value.correo ?? '',
      fechaNacimiento: this.form.value.fechaNacimiento ?? '',
      calle: this.form.value.calle ?? '',
      numero: this.form.value.numero ?? '',
      deptoCasa: this.form.value.deptoCasa ?? '',
      comuna: this.form.value.comuna ?? '',
      region: this.form.value.region ?? ''
    });

    this.mensaje = 'Perfil actualizado correctamente.';
  }

  cerrarSesion(event: Event): void {
    event.preventDefault();
    this.auth.logout();
  }

  esAdmin(): boolean {
    return this.auth.esAdmin();
  }
}