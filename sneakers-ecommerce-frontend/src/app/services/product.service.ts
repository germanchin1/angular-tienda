import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Product, Category } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getProducts() {
    return this.http.get<{data: Product[]}>(`${this.apiUrl}/products`).pipe(
      map(res => res.data)
    );
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductBySlug(slug: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${slug}`);
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(categoryId: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${categoryId}`);
  }

  // Admin methods
  createProduct(product: Partial<Product>) {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: Partial<Product>) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}
