import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { OrderService } from '../services/order.service';
import { Order } from '../models/interfaces';

export interface AdminOrdersPageData {
  orders: Order[];
}

export const adminOrdersResolver: ResolveFn<AdminOrdersPageData> = () => {
  const orderService = inject(OrderService);
  return orderService.getAllOrders().pipe(
    map(orders => ({ orders }))
  );
};
