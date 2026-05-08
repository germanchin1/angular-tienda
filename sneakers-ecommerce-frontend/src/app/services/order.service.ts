import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/orders';

  createOrder(orderData: any) {
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  getMyOrders() {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getAllOrders() {
    return this.http.get<Order[]>(`${this.apiUrl}/admin/all`);
  }

  updateOrderStatus(orderId: number, status: string) {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}/status`, { status });
  }
}
