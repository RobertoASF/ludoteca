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

  ventasSimuladas(): string {
    return '$284.900';
  }

  cerrarSesion(event: Event): void {
    event.preventDefault();
    this.auth.logout();
  }
}