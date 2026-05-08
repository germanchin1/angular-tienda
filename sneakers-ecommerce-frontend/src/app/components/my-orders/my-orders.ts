import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/interfaces';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: Order[] = [];
  expandedOrderId: number | null = null;

  ngOnInit() {
    this.orderService.getMyOrders().subscribe(data => this.orders = data);
  }

  toggleDetails(id: number) {
    this.expandedOrderId = this.expandedOrderId === id ? null : id;
  }
}
