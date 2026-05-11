import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Category, Product } from '../models/interfaces';
import { ProductService } from '../services/product.service';

export interface CatalogPageData {
  categories: Category[];
  products: Product[];
}

export const catalogResolver: ResolveFn<CatalogPageData> = () => {
  const productService = inject(ProductService);

  return forkJoin({
    categories: productService.getCategories(),
    products: productService.getProducts()
  });
};