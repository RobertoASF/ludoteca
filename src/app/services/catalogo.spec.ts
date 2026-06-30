import { TestBed } from '@angular/core/testing';

import { CatalogoService } from './catalogo';

describe('CatalogoService', () => {
  let service: CatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoService);
  });

  it('debería crear el servicio de catálogo', () => {
    expect(service).toBeTruthy();
  });

  it('debería tener exactamente 4 categorías principales', () => {
    const categorias = service.obtenerCategorias();

    expect(categorias.length).toBe(4);
  });

  it('debería obtener correctamente la categoría Familiares', () => {
    const categoria = service.obtenerCategoria('familiares');

    expect(categoria).toBeTruthy();
    expect(categoria?.slug).toBe('familiares');
    expect(categoria?.nombre).toBe('Familiares');
  });

  it('debería retornar undefined cuando la categoría no existe', () => {
    const categoria = service.obtenerCategoria('categoria-inexistente');

    expect(categoria).toBeUndefined();
  });

  it('debería excluir la categoría actual al obtener otras categorías', () => {
    const otrasCategorias = service.obtenerOtrasCategorias('misterio');

    expect(otrasCategorias.length).toBe(3);
    expect(otrasCategorias.some(categoria => categoria.slug === 'misterio')).toBeFalsy();
  });

  it('todas las categorías deberían tener slug único', () => {
    const categorias = service.obtenerCategorias();
    const slugs = categorias.map(categoria => categoria.slug);
    const slugsUnicos = new Set(slugs);

    expect(slugsUnicos.size).toBe(slugs.length);
  });

  it('todas las categorías deberían tener al menos un juego', () => {
    const categorias = service.obtenerCategorias();

    const todasTienenJuegos = categorias.every(categoria => categoria.juegos.length > 0);

    expect(todasTienenJuegos).toBeTruthy();
  });

  it('todos los juegos deberían tener nombre, descripción, imagen y chip', () => {
    const juegos = service.obtenerCategorias().flatMap(categoria => categoria.juegos);

    const juegosValidos = juegos.every(juego => {
      return Boolean(
        juego.nombre.trim() &&
        juego.descripcion.trim() &&
        juego.imagen.trim() &&
        juego.chip.trim()
      );
    });

    expect(juegosValidos).toBeTruthy();
  });

  it('los juegos con descuento deberían tener texto de descuento válido', () => {
    const juegosConDescuento = service
      .obtenerCategorias()
      .flatMap(categoria => categoria.juegos)
      .filter(juego => juego.descuento);

    const descuentosValidos = juegosConDescuento.every(juego => {
      return juego.descuentoTexto.toLowerCase().includes('sí') ||
        juego.descuentoTexto.includes('%') ||
        Boolean(juego.porcentajeDescuento);
    });

    expect(descuentosValidos).toBeTruthy();
  });
});