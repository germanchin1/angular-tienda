import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product, Category } from '../../../models/interfaces';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css'
})
export class AdminProductsComponent implements OnInit {
  private productService = inject(ProductService);
  products: Product[] = [];
  categories: Category[] = [];
  showModal = false;
  editingProduct: Product | null = null;
  formProduct: Partial<Product> = {};

  ngOnInit() {
    this.loadData();
  }

  loadOrders() { // Note: some methods might need renaming if I copied wrong earlier, fixing here
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe(prods => this.products = prods);
    this.productService.getCategories().subscribe(cats => this.categories = cats);
  }

  getCategoryName(id: number) {
    return this.categories.find(c => c.id === id)?.name || 'N/A';
  }

  openModal(product: Product | null = null) {
    this.editingProduct = product;
    this.formProduct = product ? { ...product } : { sizes: ['38','39','40','41','42','43','44','45'], is_active: true };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
  }

  saveProduct() {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.formProduct).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    } else {
      this.productService.createProduct(this.formProduct).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto (borrado lógico)?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadData());
    }
  }
}
