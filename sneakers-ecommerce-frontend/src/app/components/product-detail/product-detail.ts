import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/interfaces';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  auth = inject(AuthService);

  product: Product | null = null;
  selectedSize: string = '';
  quantity: number = 1;

  ngOnInit() {
    const slug = this.route.snapshot.params['slug'];
    this.productService.getProductBySlug(slug).subscribe(prod => {
      this.product = prod;
    });
  }

  addToCart() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.product && this.selectedSize) {
      this.cartService.addToCart(this.product, this.quantity, this.selectedSize);
      alert('Producto añadido al carrito');
    }
  }
}
