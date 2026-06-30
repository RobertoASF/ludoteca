export interface Juego {
    nombre: string;
    descripcion: string;
    precio: number;
    descuento: boolean;
    descuentoTexto: string;
    porcentajeDescuento?: number;
    imagen: string;
    chip: string;
  }
  
  export interface Categoria {
    slug: string;
    nombre: string;
    icono: string;
    descripcion: string;
    imagen: string;
    juegos: Juego[];
  }