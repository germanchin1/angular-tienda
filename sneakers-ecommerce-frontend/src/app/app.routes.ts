import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';
import { homeResolver } from './resolvers/home.resolver';
import { catalogResolver } from './resolvers/catalog.resolver';
import { productResolver } from './resolvers/product.resolver';
import { adminProductsResolver } from './resolvers/admin-products.resolver';
import { adminOrdersResolver } from './resolvers/admin-orders.resolver';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home').then(c => c.HomeComponent),
    resolve: { pageData: homeResolver }
  },
  { 
    path: 'catalog', 
    loadComponent: () => import('./components/catalog/catalog').then(c => c.CatalogComponent),
    resolve: { pageData: catalogResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { 
    path: 'product/:slug', 
    loadComponent: () => import('./components/product-detail/product-detail').then(c => c.ProductDetailComponent),
    resolve: { product: productResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
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
    canActivate: [adminGuard],
    resolve: { pageData: adminProductsResolver }
  },
  { 
    path: 'admin/orders', 
    loadComponent: () => import('./components/admin/admin-orders/admin-orders').then(c => c.AdminOrdersComponent),
    canActivate: [adminGuard],
    resolve: { pageData: adminOrdersResolver }
  },
  { path: '**', redirectTo: '' }
];
