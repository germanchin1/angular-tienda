export interface User {
  id: string;
  email: string;
  nombre: string;
  role: 'Usuario' | 'Administrador';
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  stock: number;
  sizes: string[]; // JSON array in DB
  is_active: boolean;
}

export interface Order {
  id: number;
  user_id: string;
  total: number;
  status: string;
  address: string;
  observations?: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  size: string;
  product?: Product;
}
