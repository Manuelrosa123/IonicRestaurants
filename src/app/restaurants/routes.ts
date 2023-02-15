import { Routes } from '@angular/router';

export const RESTAURANT_ROUTES: Routes = [
  {
    path: '',
    //pathMatch: 'full',
    loadComponent: () =>
      import('./restaurant-page/restaurant-page.component').then(
        (m) => m.RestaurantPageComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./new-restaurant/new-restaurant.component').then(
        (m) => m.NewRestaurantComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./restaurant-details/restaurant-details.component').then(
        (m) => m.RestaurantDetailsComponent
      ),
    loadChildren: () =>
      import('./restaurant-details/routes').then(
        (m) => m.RESTAURANT_DETAILS_ROUTES
      ),
  },
];
























/*{
    path: 'add',
    loadComponent: () =>
      import('./product-form/product-form.component').then(
        (m) => m.ProductFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
    loadChildren: () =>
      import('./product-details/routes').then((m) => m.PRODUCT_DETAIL_ROUTES),
  },*/
