import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  mensaje = '';

  form = this.fb.group({
    nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
    usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9_]{4,20}')]],
    correo: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required],
    clave: ['', [Validators.required, Validators.minLength(8)]],
    repetirClave: ['', [Validators.required, Validators.minLength(8)]],
    calle: ['', [Validators.required, Validators.minLength(3)]],
    numero: ['', [Validators.required, Validators.pattern('[0-9]{1,6}[A-Za-z]?')]],
    deptoCasa: ['', Validators.required],
    comuna: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{3,}')]],
    region: ['', Validators.required],
    aceptaTerminos: [false, Validators.requiredTrue]
  });

  crearCuenta(): void {
    this.mensaje = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensaje = 'Revisa los campos marcados en rojo antes de continuar.';
      return;
    }

    if (this.form.value.clave !== this.form.value.repetirClave) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    const ok = this.auth.registrar({
      usuario: this.form.value.usuario!,
      clave: this.form.value.clave!,
      rol: 'usuario',
      nombreCompleto: this.form.value.nombreCompleto!,
      correo: this.form.value.correo!,
      fechaNacimiento: this.form.value.fechaNacimiento!,
      calle: this.form.value.calle!,
      numero: this.form.value.numero!,
      deptoCasa: this.form.value.deptoCasa!,
      comuna: this.form.value.comuna!,
      region: this.form.value.region!
    });

    if (!ok) {
      this.mensaje = 'Ese nombre de usuario ya existe. Prueba con otro.';
      return;
    }

    this.router.navigateByUrl('/perfil');
  }
}