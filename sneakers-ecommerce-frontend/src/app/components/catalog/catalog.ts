import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Product, Category } from '../../models/interfaces';
import { CatalogPageData } from '../../resolvers/catalog.resolver';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  private route = inject(ActivatedRoute);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string | null = null;

  ngOnInit() {
    console.log('CatalogComponent initialized');
    const data = this.route.snapshot.data['pageData'] as CatalogPageData | undefined;

    if (data) {
      this.categories = data.categories;
      this.products = data.products;
    }

    this.route.queryParamMap.subscribe(paramMap => {
      const category = paramMap.get('category');
      console.log('Query params changed:', { category });
      this.filterByCategory(category);
    });
  }

  filterByCategory(id: string | null) {
    console.log('Filtering by category ID:', id);
    this.selectedCategory = id;
    if (id) {
      this.filteredProducts = this.products.filter(p => p.category_id === id);
      console.log('Filtered products count:', this.filteredProducts.length);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
