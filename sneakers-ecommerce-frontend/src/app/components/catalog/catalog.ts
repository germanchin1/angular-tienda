import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/interfaces';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: number | null = null;

  ngOnInit() {
    this.productService.getCategories().subscribe(cats => this.categories = cats);
    this.productService.getProducts().subscribe(prods => {
      this.products = prods;
      this.route.queryParams.subscribe(params => {
        if (params['category']) {
          this.filterByCategory(+params['category']);
        } else {
          this.filteredProducts = prods;
        }
      });
    });
  }

  filterByCategory(id: number | null) {
    this.selectedCategory = id;
    if (id) {
      this.filteredProducts = this.products.filter(p => p.category_id === id);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
