import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { AdminOrdersPageData } from '../../../resolvers/admin-orders.resolver';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  orders: Order[] = [];
  expandedOrderId: string | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit() {
    const data = this.route.snapshot.data['pageData'] as AdminOrdersPageData | undefined;
    if (data) {
      this.orders = data.orders;
      this.loading = false;
    } else {
      this.errorMessage = 'No se pudieron cargar los pedidos.';
      this.loading = false;
    }
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
