import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Category, Product } from '../models/interfaces';

export interface AdminProductsPageData {
  products: Product[];
  categories: Category[];
}

export const adminProductsResolver: ResolveFn<AdminProductsPageData> = () => {
  const productService = inject(ProductService);

  return forkJoin({
    products: productService.getProducts(),
    categories: productService.getCategories(),
  });
};
