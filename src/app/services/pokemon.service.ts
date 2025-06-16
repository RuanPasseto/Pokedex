import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonAPIResponse, PokemonDetails, PokemonResult } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(offset: number = 0, limit: number = 24): Observable<PokemonAPIResponse> {
    return this.http.get<PokemonAPIResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map(response => {
        response.results = response.results.map(pokemon => {
          const id = this.extractIdFromUrl(pokemon.url);
          pokemon.id = id;
          pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          return pokemon;
        });
        return response;
      })
    );
  }

  getPokemonDetails(id: string | number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${id}`);
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/').filter(part => part !== '');
    return +parts[parts.length - 1];
  }
}