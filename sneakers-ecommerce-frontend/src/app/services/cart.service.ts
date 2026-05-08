import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/interfaces';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>(this.getCartFromStorage());

  items = computed(() => this.cartItems());
  totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));

  constructor() {}

  addToCart(product: Product, quantity: number, size: string) {
    const current = this.cartItems();
    const index = current.findIndex(item => item.product.id === product.id && item.size === size);

    if (index > -1) {
      current[index].quantity += quantity;
      this.cartItems.set([...current]);
    } else {
      this.cartItems.set([...current, { product, quantity, size }]);
    }
    this.saveCartToStorage();
  }

  removeFromCart(index: number) {
    const current = this.cartItems();
    current.splice(index, 1);
    this.cartItems.set([...current]);
    this.saveCartToStorage();
  }

  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem('cart');
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  private getCartFromStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
}
