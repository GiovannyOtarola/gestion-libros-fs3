import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Libro {
  id?: number; // Opcional porque es generado automáticamente
  titulo: string;
  autor: string;
  anioPublicacion: number; // Es un número entero
  genero: string;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = 'http://localhost:8080/api/libros'; // URL del backend

  constructor(private http: HttpClient) {}

  
    // Obtener la lista de libros
    getLibros(): Observable<Libro[]> {
      return this.http.get<Libro[]>(this.apiUrl);
    }

    //Crear un nuevo libro
    addLibro(libro: Libro): Observable<Libro> {
      return this.http.post<Libro>(this.apiUrl, libro);
    }

    // Obtener un libro por su ID
    getLibro(id: number): Observable<Libro> {
      return this.http.get<Libro>(`${this.apiUrl}/${id}`);
    }

    // Actualizar un libro existente
    updateLibro(id: number, libro: Libro): Observable<Libro> {
      return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
    }

    // Eliminar un libro por su ID
    deleteLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}