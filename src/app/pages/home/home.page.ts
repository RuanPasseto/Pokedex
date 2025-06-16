import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonResult } from '../../interfaces/pokemon';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {
  pokemons: PokemonResult[] = [];
  private offset = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.offset).subscribe(response => {
      this.pokemons = [...this.pokemons, ...response.results];
    });
  }

  loadMore(event: Event) {
    this.offset += 24;
    this.pokemonService.getPokemons(this.offset).subscribe(response => {
      this.pokemons = [...this.pokemons, ...response.results];
      (event as InfiniteScrollCustomEvent).target.complete();
    });
  }
}