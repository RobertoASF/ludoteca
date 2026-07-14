import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { JuegosApiService } from '../../services/juegos-api';
import { Juego } from '../../models/juego.model';

@Component({
  selector: 'app-admin-juegos',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-juegos.html',
  styleUrl: './admin-juegos.css'
})
export class AdminJuegos implements OnInit {
  private fb = inject(FormBuilder);
  private juegosApi = inject(JuegosApiService);

  juegos: Juego[] = [];
  cargando = false;
  mensaje = '';
  error = '';
  editandoId: string | null = null;

  form = this.fb.group({
    categoriaSlug: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    precio: [0, [Validators.required, Validators.min(1000)]],
    descuento: [false],
    descuentoTexto: ['No', Validators.required],
    porcentajeDescuento: [0],
    imagen: ['/img/juegos/space-base.svg', Validators.required],
    chip: ['🎲 Juego', Validators.required]
  });

  ngOnInit(): void {
    this.cargarJuegos();
  }

  cargarJuegos(): void {
    this.cargando = true;
    this.error = '';

    this.juegosApi.listar().subscribe({
      next: juegos => {
        this.juegos = juegos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el catálogo desde Firebase.';
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    this.mensaje = '';
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Revisa los campos antes de guardar.';
      return;
    }

    const formValue = this.form.getRawValue();
    const juego: Juego = {
      categoriaSlug: formValue.categoriaSlug ?? '',
      nombre: formValue.nombre ?? '',
      descripcion: formValue.descripcion ?? '',
      precio: Number(formValue.precio ?? 0),
      descuento: !!formValue.descuento,
      descuentoTexto: formValue.descuentoTexto ?? 'No',
      porcentajeDescuento: Number(formValue.porcentajeDescuento ?? 0),
      imagen: formValue.imagen ?? '/img/juegos/space-base.svg',
      chip: formValue.chip ?? '🎲 Juego'
    };

    if (this.editandoId) {
      this.juegosApi.actualizar(this.editandoId, juego).subscribe({
        next: () => {
          this.mensaje = 'Juego actualizado correctamente.';
          this.cancelarEdicion();
          this.cargarJuegos();
        },
        error: () => {
          this.error = 'No se pudo actualizar el juego.';
        }
      });

      return;
    }

    this.juegosApi.crear(juego).subscribe({
      next: () => {
        this.mensaje = 'Juego creado correctamente.';
        this.cancelarEdicion();
        this.cargarJuegos();
      },
      error: () => {
        this.error = 'No se pudo crear el juego.';
      }
    });
  }

  editar(juego: Juego): void {
    this.editandoId = juego.id ?? null;

    this.form.patchValue({
      categoriaSlug: juego.categoriaSlug,
      nombre: juego.nombre,
      descripcion: juego.descripcion,
      precio: juego.precio,
      descuento: juego.descuento,
      descuentoTexto: juego.descuentoTexto,
      porcentajeDescuento: juego.porcentajeDescuento ?? 0,
      imagen: juego.imagen,
      chip: juego.chip
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminar(juego: Juego): void {
    if (!juego.id) {
      return;
    }

    const confirmar = confirm(`¿Eliminar el juego ${juego.nombre}?`);

    if (!confirmar) {
      return;
    }

    this.juegosApi.eliminar(juego.id).subscribe({
      next: () => {
        this.mensaje = 'Juego eliminado correctamente.';
        this.cargarJuegos();
      },
      error: () => {
        this.error = 'No se pudo eliminar el juego.';
      }
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset({
      categoriaSlug: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      descuento: false,
      descuentoTexto: 'No',
      porcentajeDescuento: 0,
      imagen: '/img/juegos/space-base.svg',
      chip: '🎲 Juego'
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  formatearCLP(valor: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(valor);
  }
}
