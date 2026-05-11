import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Product } from '../models/interfaces';
import { ProductService } from '../services/product.service';

export const productResolver: ResolveFn<Product | null> = (route) => {
  const productService = inject(ProductService);
  const slug = route.paramMap.get('slug');

  if (!slug) {
    return of(null);
  }

  return productService.getProductBySlug(slug).pipe(
    catchError(() => of(null))
  );
};