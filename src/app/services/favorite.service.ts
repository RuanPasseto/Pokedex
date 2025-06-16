import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly FAVORITES_KEY = 'pokemonFavorites';

  constructor() { }

  private getFavorites(): number[] {
    const favorites = localStorage.getItem(this.FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  }

  isFavorite(pokemonId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(pokemonId);
  }

  toggleFavorite(pokemonId: number): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(pokemonId);

    if (index === -1) {
      favorites.push(pokemonId);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    } else {
      favorites.splice(index, 1);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      return false;
    }
  }

  getFavoriteIds(): number[] {
    return this.getFavorites();
  }
}