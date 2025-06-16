import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../interfaces/pokemon';
import { FavoriteService } from '../../services/favorite.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf, *ngFor, etc.

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DetailsPage implements OnInit {
  pokemon: PokemonDetails | null = null;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    // Usamos 'any' aqui para simplificar a conversão do parâmetro
    const id: any = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetails(id).subscribe(details => {
        this.pokemon = details;
        if (this.pokemon) {
          this.isFavorite = this.favoriteService.isFavorite(this.pokemon.id);
        }
      });
    }
  }

  toggleFavorite() {
    if (this.pokemon) {
      this.isFavorite = this.favoriteService.toggleFavorite(this.pokemon.id);
    }
  }
}