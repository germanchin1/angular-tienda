import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home').then(c => c.HomeComponent) 
  },
  { 
    path: 'catalog', 
    loadComponent: () => import('./components/catalog/catalog').then(c => c.CatalogComponent) 
  },
  { 
    path: 'product/:slug', 
    loadComponent: () => import('./components/product-detail/product-detail').then(c => c.ProductDetailComponent) 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login').then(c => c.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register').then(c => c.RegisterComponent) 
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./components/cart/cart').then(c => c.CartComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'my-orders', 
    loadComponent: () => import('./components/my-orders/my-orders').then(c => c.MyOrdersComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'admin/products', 
    loadComponent: () => import('./components/admin/admin-products/admin-products').then(c => c.AdminProductsComponent),
    canActivate: [adminGuard] 
  },
  { 
    path: 'admin/orders', 
    loadComponent: () => import('./components/admin/admin-orders/admin-orders').then(c => c.AdminOrdersComponent),
    canActivate: [adminGuard] 
  },
  { path: '**', redirectTo: '' }
];
