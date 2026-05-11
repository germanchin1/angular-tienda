import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Category, Product } from '../models/interfaces';
import { ProductService } from '../services/product.service';

export interface HomePageData {
  categories: Category[];
  products: Product[];
}

export const homeResolver: ResolveFn<HomePageData> = () => {
  const productService = inject(ProductService);

  return forkJoin({
    categories: productService.getCategories(),
    products: productService.getProducts()
  });
};