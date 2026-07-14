import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Juego } from '../models/juego.model';

type FirebaseJuegosResponse = Record<string, Juego>;

@Injectable({
  providedIn: 'root'
})
export class JuegosApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.firebaseDbUrl}/juegos`;

  listar(): Observable<Juego[]> {
    return this.http.get<FirebaseJuegosResponse | null>(`${this.baseUrl}.json`).pipe(
      map(data => {
        if (!data) {
          return [];
        }

        return Object.entries(data).map(([id, juego]) => ({
          ...juego,
          id: juego.id ?? id
        }));
      })
    );
  }

  listarPorCategoria(categoriaSlug: string): Observable<Juego[]> {
    return this.listar().pipe(
      map(juegos => juegos.filter(juego => juego.categoriaSlug === categoriaSlug))
    );
  }

  obtenerPorId(id: string): Observable<Juego | null> {
    return this.http.get<Juego | null>(`${this.baseUrl}/${id}.json`).pipe(
      map(juego => juego ? { ...juego, id } : null)
    );
  }

  crear(juego: Juego): Observable<Juego> {
    const { id, ...payload } = juego;

    return this.http.post<{ name: string }>(`${this.baseUrl}.json`, payload).pipe(
      switchMap(respuesta => {
        const idGenerado = respuesta.name;
        const juegoConId: Juego = {
          ...juego,
          id: idGenerado
        };

        return this.actualizar(idGenerado, juegoConId);
      })
    );
  }

  actualizar(id: string, juego: Juego): Observable<Juego> {
    const juegoActualizado: Juego = {
      ...juego,
      id
    };

    return this.http.put<Juego>(`${this.baseUrl}/${id}.json`, juegoActualizado);
  }

  eliminar(id: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/${id}.json`);
  }
}
