import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, Category } from '../../models/interfaces';
import { HomePageData } from '../../resolvers/home.resolver';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  categories: Category[] = [];
  featuredProducts: Product[] = [];

  ngOnInit() {
    const data = this.route.snapshot.data['pageData'] as HomePageData | undefined;

    if (data) {
      this.categories = data.categories;
      this.featuredProducts = data.products.slice(0, 4);
    }
  }
}
