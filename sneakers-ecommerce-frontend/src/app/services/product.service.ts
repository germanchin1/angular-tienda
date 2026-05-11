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
    console.log('Fetching products from:', `${this.apiUrl}/products`);
    return this.http.get<{data: Product[]}>(`${this.apiUrl}/products`).pipe(
      map(res => {
        console.log('Products received:', res.data);
        return res.data;
      })
    );
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductBySlug(slug: string) {
    console.log('API call: getProductBySlug', slug);
    return this.http.get<Product>(`${this.apiUrl}/products/${slug}`).pipe(
      map(prod => {
        console.log('Raw product data from API:', prod);
        return prod;
      })
    );
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(categoryId: string) {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${categoryId}`);
  }

  // Admin methods
  createProduct(product: Partial<Product>) {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: string, product: Partial<Product>) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}
