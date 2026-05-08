import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: Order[] = [];
  expandedOrderId: number | null = null;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(data => this.orders = data);
  }

  updateStatus(id: number, newStatus: string) {
    this.orderService.updateOrderStatus(id, newStatus).subscribe(() => {
      alert('Estado actualizado');
      this.loadOrders();
    });
  }

  toggleDetails(id: number) {
    this.expandedOrderId = this.expandedOrderId === id ? null : id;
  }
}
