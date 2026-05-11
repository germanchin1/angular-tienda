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
  expandedOrderId: string | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.errorMessage = '';

    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando pedidos admin:', err);
        this.errorMessage = 'No se pudieron cargar los pedidos.';
        this.loading = false;
      }
    });
  }

  updateStatus(id: string, newStatus: string) {
    this.loading = true;
    this.errorMessage = '';

    this.orderService.updateOrderStatus(id, newStatus).subscribe({
      next: () => {
        alert('Estado actualizado');
        this.loadOrders();
      },
      error: (err) => {
        console.error('Error actualizando estado:', err);
        this.errorMessage = 'No se pudo actualizar el estado.';
        this.loading = false;
      }
    });
  }

  toggleDetails(id: string) {
    this.expandedOrderId = this.expandedOrderId === id ? null : id;
  }
}
