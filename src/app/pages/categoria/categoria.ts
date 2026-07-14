import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CatalogoService } from '../../services/catalogo';
import { JuegosApiService } from '../../services/juegos-api';
import { Categoria as CategoriaModel, Juego } from '../../models/juego.model';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, RouterLink],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class CategoriaComponent implements OnInit {
  categoria?: CategoriaModel;
  juegos: Juego[] = [];
  otrasCategorias: CategoriaModel[] = [];
  cargando = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private catalogoService: CatalogoService,
    private juegosApi: JuegosApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');

      this.categoria = undefined;
      this.juegos = [];
      this.otrasCategorias = [];
      this.error = '';

      if (!slug) {
        return;
      }

      const categoriaEncontrada = this.catalogoService.obtenerCategoria(slug);

      if (!categoriaEncontrada) {
        return;
      }

      this.categoria = categoriaEncontrada;
      this.otrasCategorias = this.catalogoService.obtenerOtrasCategorias(slug);
      this.cargarJuegos(slug);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  cargarJuegos(slug: string): void {
    this.cargando = true;
    this.error = '';

    this.juegosApi.listarPorCategoria(slug).subscribe({
      next: juegos => {
        this.juegos = juegos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los juegos desde Firebase.';
        this.cargando = false;
      }
    });
  }

  formatearCLP(valor: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(valor);
  }

  trackByJuego(index: number, juego: Juego): string {
    return juego.id ?? `${juego.nombre}-${index}`;
  }
}
