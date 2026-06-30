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

      if (!slug) {
        return;
      }

      this.categoria = this.catalogoService.obtenerCategoria(slug);
      this.otrasCategorias = this.catalogoService.obtenerOtrasCategorias(slug);
    });
  }
}