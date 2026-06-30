import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CatalogoService } from '../../services/catalogo';
import { Categoria as CategoriaModel } from '../../models/juego.model';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, RouterLink],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class CategoriaComponent implements OnInit {
  categoria?: CategoriaModel;
  otrasCategorias: CategoriaModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private catalogoService: CatalogoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');

      this.categoria = undefined;
      this.otrasCategorias = [];

      if (!slug) {
        return;
      }

      const categoriaEncontrada = this.catalogoService.obtenerCategoria(slug);

      if (!categoriaEncontrada) {
        return;
      }

      this.categoria = categoriaEncontrada;
      this.otrasCategorias = this.catalogoService.obtenerOtrasCategorias(slug);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  formatearCLP(valor: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(valor);
  }

  trackByJuego(index: number): string {
    return `${this.categoria?.slug}-${index}`;
  }
}