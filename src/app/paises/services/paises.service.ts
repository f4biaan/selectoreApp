import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getPaisesByRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisByCodigoCCA3(codigo: string): Observable<PaisSmall[] | []> {
    // console.log('codigo', codigo);
    if(!codigo) {
      return of([]);
    }
    const url: string = `${this.baseUrl}/alpha/${codigo}`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisByCodigoCCA3Small(codigo: string): Observable<PaisSmall> {
    // console.log('codigo', codigo);

    const url: string = `${this.baseUrl}/alpha/${codigo}?fields=cca3,name`;
    return this.http.get<PaisSmall>(url);
  }
}
