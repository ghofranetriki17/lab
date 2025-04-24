import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pub } from 'src/modeles/Pub';

@Injectable({
  providedIn: 'root'
})
export class PubService {
  private baseUrl = 'http://localhost:3000/pubs';

  constructor(private http: HttpClient) {}

  // Lire toutes les publications
  GetAllPub(): Observable<Pub[]> {
    return this.http.get<Pub[]>(this.baseUrl);
  }

  // Créer une publication
  createPub(pub: Pub): Observable<any> {
    return this.http.post(this.baseUrl, pub);
  }

  // Modifier une publication
  updatePub(id: number, pub: Pub): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, pub);
  }

  // Supprimer une publication
  deletePub(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  ajouterMembreAPublication(publicationId: number, memberId: number) {
    return this.http.post(`http://localhost:8000/api/publications/${publicationId}/membres`, { memberId });
  }
  
  // Lire une publication par ID (utile si tu veux un formulaire de modification)
  getPubById(id: number): Observable<Pub> {
    return this.http.get<Pub>(`${this.baseUrl}/${id}`);
  }
}
