import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/details/details.page').then((m) => m.DetailsPage),
  },
  {
    path: '',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.page').then(m => m.FavoritesPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];