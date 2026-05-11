import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  cart = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  address: string = '';
  observations: string = '';

  goCatalog() { this.router.navigate(['/catalog']); }

  finishOrder() {
    const orderData = {
      shipping_address: this.address,
      notes: this.observations,
      items: this.cart.items().map(i => ({
        product_id: i.product.id,
        quantity: i.quantity,
        unit_price: i.product.price,
        size: i.size
      }))
    };

    this.orderService.createOrder(orderData).subscribe(() => {
      alert('¡Pedido realizado con éxito!');
      this.cart.clearCart();
      this.router.navigate(['/my-orders']);
    });
  }
}
