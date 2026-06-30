import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { CatalogoService } from '../../services/catalogo';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private auth = inject(AuthService);
  private catalogoService = inject(CatalogoService);

  categorias = this.catalogoService.obtenerCategorias();

  usuarioActual = computed(() => this.auth.sesion());

  fechaActual = new Date();

  totalUsuarios(): number {
    return this.auth.cantidadUsuarios();
  }

  totalCategorias(): number {
    return this.categorias.length;
  }

  totalJuegos(): number {
    return this.categorias.reduce((total, categoria) => {
      return total + categoria.juegos.length;
    }, 0);
  }

  totalJuegosConDescuento(): number {
    return this.categorias.reduce((total, categoria) => {
      return total + categoria.juegos.filter(juego => juego.descuento).length;
    }, 0);
  }

  totalJuegosSinDescuento(): number {
    return this.totalJuegos() - this.totalJuegosConDescuento();
  }

  valorCatalogo(): string {
    const total = this.categorias.reduce((suma, categoria) => {
      const subtotal = categoria.juegos.reduce((acc, juego) => {
        return acc + juego.precio;
      }, 0);

      return suma + subtotal;
    }, 0);

    return this.formatearCLP(total);
  }

  precioPromedio(): string {
    const totalJuegos = this.totalJuegos();

    if (totalJuegos === 0) {
      return '$0';
    }

    const total = this.categorias.reduce((suma, categoria) => {
      const subtotal = categoria.juegos.reduce((acc, juego) => {
        return acc + juego.precio;
      }, 0);

      return suma + subtotal;
    }, 0);

    return this.formatearCLP(Math.round(total / totalJuegos));
  }

  categoriasResumen() {
    return this.categorias.map(categoria => {
      const juegosConDescuento = categoria.juegos.filter(juego => juego.descuento).length;

      return {
        nombre: categoria.nombre,
        slug: categoria.slug,
        icono: categoria.icono,
        totalJuegos: categoria.juegos.length,
        juegosConDescuento,
        juegosSinDescuento: categoria.juegos.length - juegosConDescuento
      };
    });
  }

  juegosDestacados() {
    return this.categorias
      .flatMap(categoria =>
        categoria.juegos.map(juego => ({
          ...juego,
          categoria: categoria.nombre,
          slugCategoria: categoria.slug,
          precioFormateado: this.formatearCLP(juego.precio)
        }))
      )
      .sort((a, b) => b.precio - a.precio)
      .slice(0, 5);
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