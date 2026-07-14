import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { CatalogoService } from '../../services/catalogo';
import { JuegosApiService } from '../../services/juegos-api';
import { Juego } from '../../models/juego.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private auth = inject(AuthService);
  private catalogoService = inject(CatalogoService);
  private juegosApi = inject(JuegosApiService);

  categorias = this.catalogoService.obtenerCategorias();
  juegosFirebase: Juego[] = [];
  cargandoFirebase = false;
  errorFirebase = '';

  usuarioActual = computed(() => this.auth.sesion());

  fechaActual = new Date();

  ngOnInit(): void {
    this.cargarJuegosFirebase();
  }

  cargarJuegosFirebase(): void {
    this.cargandoFirebase = true;
    this.errorFirebase = '';

    this.juegosApi.listar().subscribe({
      next: juegos => {
        this.juegosFirebase = juegos;
        this.cargandoFirebase = false;
      },
      error: () => {
        this.errorFirebase = 'No se pudo cargar información desde Firebase.';
        this.cargandoFirebase = false;
      }
    });
  }

  totalUsuarios(): number {
    return this.auth.cantidadUsuarios();
  }

  totalCategorias(): number {
    return this.categorias.length;
  }

  totalJuegos(): number {
    return this.categorias.reduce((total, categoria) => {
      return total + (categoria.juegos?.length ?? 0);
    }, 0);
  }

  totalJuegosFirebase(): number {
    return this.juegosFirebase.length;
  }

  totalJuegosConDescuento(): number {
    return this.juegosFirebase.filter(juego => juego.descuento).length;
  }

  totalJuegosSinDescuento(): number {
    return this.totalJuegosFirebase() - this.totalJuegosConDescuento();
  }

  valorCatalogo(): string {
    const total = this.juegosFirebase.reduce((suma, juego) => {
      return suma + juego.precio;
    }, 0);

    return this.formatearCLP(total);
  }

  precioPromedio(): string {
    const totalJuegos = this.totalJuegosFirebase();

    if (totalJuegos === 0) {
      return '$0';
    }

    const total = this.juegosFirebase.reduce((suma, juego) => {
      return suma + juego.precio;
    }, 0);

    return this.formatearCLP(Math.round(total / totalJuegos));
  }

  categoriasResumen() {
    return this.categorias.map(categoria => {
      const juegosCategoria = this.juegosFirebase.filter(juego => juego.categoriaSlug === categoria.slug);
      const juegosConDescuento = juegosCategoria.filter(juego => juego.descuento).length;

      return {
        nombre: categoria.nombre,
        slug: categoria.slug,
        icono: categoria.icono,
        totalJuegos: juegosCategoria.length,
        juegosConDescuento,
        juegosSinDescuento: juegosCategoria.length - juegosConDescuento
      };
    });
  }

  juegosDestacados() {
    return this.juegosFirebase
      .map(juego => ({
        ...juego,
        categoria: this.obtenerNombreCategoria(juego.categoriaSlug),
        slugCategoria: juego.categoriaSlug,
        precioFormateado: this.formatearCLP(juego.precio)
      }))
      .sort((a, b) => b.precio - a.precio)
      .slice(0, 5);
  }

  obtenerNombreCategoria(slug: string): string {
    return this.categorias.find(categoria => categoria.slug === slug)?.nombre ?? slug;
  }

  cerrarSesion(event: Event): void {
    event.preventDefault();
    this.auth.logout();
  }

  formatearCLP(valor: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(valor);
  }
}
