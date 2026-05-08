import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  categories: Category[] = [];
  featuredProducts: Product[] = [];

  ngOnInit() {
    this.productService.getCategories().subscribe(cats => this.categories = cats);
    this.productService.getProducts().subscribe(prods => {
      this.featuredProducts = prods.slice(0, 4);
    });
  }
}
