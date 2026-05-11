import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  private cartService = inject(CartService);
  auth = inject(AuthService);

  product: Product | null = null;
  errorMessage = '';
  selectedSize: string = '';
  quantity: number = 1;

  ngOnInit() {
    this.route.data.subscribe(data => {
      const product = data['product'] as Product | null | undefined;

      if (!product) {
        this.errorMessage = 'No se pudo cargar el producto.';
        this.product = null;
        return;
      }

      this.product = {
        ...product,
        sizes: Array.isArray(product.sizes) ? product.sizes : []
      };
      this.selectedSize = this.product.sizes[0] || '';
      this.errorMessage = '';
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
