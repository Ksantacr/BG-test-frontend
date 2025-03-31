//import { ProductListComponent } from './components/product/product-list.component';
//import { ProductAddBatchComponent } from ' /components/product/product-add-batch.component';
import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductAddBatchComponent } from './product-add-batch.component';

export const routesProducts: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/add-batch', component: ProductAddBatchComponent },
];
