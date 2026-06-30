export interface Usuario {
    usuario: string;
    clave: string;
    rol: 'usuario' | 'admin';
    nombreCompleto: string;
    correo: string;
    fechaNacimiento: string;
    calle: string;
    numero: string;
    deptoCasa: string;
    comuna: string;
    region: string;
  }