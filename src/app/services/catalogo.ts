import { Injectable } from '@angular/core';
import { Categoria } from '../models/juego.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private categorias: Categoria[] = [
    {
      slug: 'familiares',
      nombre: 'Familiares',
      icono: '🏠',
      descripcion: 'Opciones entretenidas, fáciles de aprender y perfectas para una tarde en familia. Revisa hasta tres juegos disponibles, cada uno con imagen, descripción breve, precio y estado de descuento.',
      imagen: '/img/categorias/familiares.svg',
      juegos: [
        {
          nombre: 'Space Base',
          descripcion: 'Construye una flota espacial, activa sectores y acumula recursos en cada turno de la mesa.',
          precio: 39990,
          descuento: true,
          descuentoTexto: 'Sí, 15%',
          porcentajeDescuento: 15,
          imagen: '/img/juegos/space-base.svg',
          chip: '🚀 Descuento'
        },
        {
          nombre: 'Wild Space',
          descripcion: 'Recluta tripulaciones animales y explora planetas para crear la mejor expedición galáctica.',
          precio: 29.990,
          descuento: false,
          descuentoTexto: 'No',
          imagen: '/img/juegos/wild-space.svg',
          chip: '🪐 Precio normal'
        },
        {
          nombre: 'Trek 12 Himalaya',
          descripcion: 'Traza rutas de ascenso, une números y desafía las montañas del Himalaya con estrategia.',
          precio: 24.990,
          descuento: true,
          descuentoTexto: 'Sí, 10%',
          imagen: '/img/juegos/trek-12-himalaya.svg',
          chip: '🏔️ Descuento'
        }
      ]
    },
    {
      slug: 'para-dos',
      nombre: 'Para dos',
      icono: '⚔️',
      descripcion: 'Partidas pensadas para dos personas, con tensión, táctica y decisiones ajustadas. Revisa hasta tres juegos disponibles, cada uno con imagen, descripción breve, precio y estado de descuento.',
      imagen: '/img/categorias/para-dos.svg',
      juegos: [
        {
          nombre: 'Curious Cargo',
          descripcion: 'Organiza cintas transportadoras, produce mercancías y supera a tu rival con precisión.',
          precio: 34.990,
          descuento: true,
          descuentoTexto: 'Sí, 12%',
          imagen: '/img/juegos/curious-cargo.svg',
          chip: '📦 Descuento'
        },
        {
          nombre: 'Cosmic Encounters Duel',
          descripcion: 'Negocia, bluffea y conquista planetas en una versión intensa para dos jugadores.',
          precio: 44.990,
          descuento: false,
          descuentoTexto: 'No',
          imagen: '/img/juegos/cosmic-encounters-duel.svg',
          chip: '🌌 Precio normal'
        },
        {
          nombre: 'Catan El Duelo: Eras Doradas',
          descripcion: 'Expande tu principado, administra recursos y desarrolla rutas comerciales en Catan.',
          precio: 32.990,
          descuento: true,
          descuentoTexto: 'Sí, 8%',
          imagen: '/img/juegos/catan-el-duelo-eras-doradas.svg',
          chip: '🌾 Descuento'
        }
      ]
    },
    {
      slug: 'misterio',
      nombre: 'Misterio',
      icono: '🕵️',
      descripcion: 'Historias para investigar, resolver enigmas y descubrir la verdad detrás de cada caso. Revisa hasta tres juegos disponibles, cada uno con imagen, descripción breve, precio y estado de descuento.',
      imagen: '/img/categorias/misterio.svg',
      juegos: [
        {
          nombre: 'Sherlock: Ensayos Fabianos',
          descripcion: 'Analiza pistas, descarta sospechas y resuelve un caso compacto al estilo detective.',
          precio: 12.990,
          descuento: false,
          descuentoTexto: 'No',
          imagen: '/img/juegos/sherlock-ensayos-fabianos.svg',
          chip: '🔎 Precio normal'
        },
        {
          nombre: 'Todo el mundo miente',
          descripcion: 'Explora una investigación moderna llena de secretos, redes sociales y verdades ocultas.',
          precio: 28.990,
          descuento: true,
          descuentoTexto: 'Sí, 10%',
          imagen: '/img/juegos/todo-el-mundo-miente.svg',
          chip: '🗞️ Descuento'
        },
        {
          nombre: 'EXIT: La Estación Polar',
          descripcion: 'Escapa de una estación congelada resolviendo acertijos antes de que sea demasiado tarde.',
          precio: 14.990,
          descuento: true,
          descuentoTexto: 'Sí, 5%',
          imagen: '/img/juegos/exit-la-estacion-polar.svg',
          chip: '❄️ Descuento'
        }
      ]
    },
    {
      slug: 'cooperativos',
      nombre: 'Cooperativos',
      icono: '🤝',
      descripcion: 'Experiencias donde el equipo comparte información, toma decisiones y alcanza un objetivo común. Revisa hasta tres juegos disponibles, cada uno con imagen, descripción breve, precio y estado de descuento.',
      imagen: '/img/categorias/cooperativos.svg',
      juegos: [
        {
          nombre: 'Pandemic: La Cura',
          descripcion: 'Lanza dados, controla brotes y trabaja con tu equipo para salvar al mundo.',
          precio: 33.990,
          descuento: true,
          descuentoTexto: 'Sí, 15%',
          imagen: '/img/juegos/pandemic-la-cura.svg',
          chip: '🧪 Descuento'
        },
        {
          nombre: 'Marvel United: X-Men',
          descripcion: 'Une héroes mutantes, coordina poderes y derrota villanos en misiones cooperativas.',
          precio: 39.990,
          descuento: false,
          descuentoTexto: 'No',
          imagen: '/img/juegos/marvel-united-x-men.svg',
          chip: '✖️ Precio normal'
        },
        {
          nombre: 'Codigo Secreto Duo',
          descripcion: 'Da pistas inteligentes y encuentra agentes secretos junto a tu compañero de misión.',
          precio: 18.990,
          descuento: true,
          descuentoTexto: 'Sí, 7%',
          imagen: '/img/juegos/codigo-secreto-duo.svg',
          chip: '🧩 Descuento'
        }
      ]
    }
  ];

  obtenerCategorias(): Categoria[] {
    return this.categorias;
  }

  obtenerCategoria(slug: string): Categoria | undefined {
    return this.categorias.find(categoria => categoria.slug === slug);
  }

  obtenerOtrasCategorias(slugActual: string): Categoria[] {
    return this.categorias.filter(categoria => categoria.slug !== slugActual);
  }
}