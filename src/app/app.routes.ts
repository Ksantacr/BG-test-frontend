import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { routesProducts } from './components/product/app-routing.module';

export let routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
    ...routesProducts
//   { 
//     path: 'products', 
//     loadChildren: () => import('./components/product/app-routing.module').then(m => m.routes) 
//   }
];