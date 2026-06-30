import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-recuperar',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css',
})
export class Recuperar {
  private fb = inject(FormBuilder);

  mensaje = '';

  form = this.fb.group({
    correoRecuperacion: ['', [Validators.required, Validators.email]]
  });

  enviarInstrucciones(): void {
    this.mensaje = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensaje = 'Ingresa un correo electrónico válido.';
      return;
    }

    this.mensaje = 'Se enviaron instrucciones simuladas de recuperación a tu correo.';
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}