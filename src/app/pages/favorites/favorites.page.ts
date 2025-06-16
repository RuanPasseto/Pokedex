import { Component } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../interfaces/pokemon';
import { forkJoin } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class FavoritesPage {
  favoritePokemons: PokemonDetails[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private pokemonService: PokemonService
  ) {}

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritePokemons = [];
    const favoriteIds = this.favoriteService.getFavoriteIds();

    if (favoriteIds.length === 0) {
      return;
    }

    const requests = favoriteIds.map(id => this.pokemonService.getPokemonDetails(id));

    if (requests.length > 0) {
      forkJoin(requests).subscribe(pokemons => {
        this.favoritePokemons = pokemons;
      });
    }
  }
}