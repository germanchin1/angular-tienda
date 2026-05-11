import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { Product, Category } from '../../../models/interfaces';
import { AdminProductsPageData } from '../../../resolvers/admin-products.resolver';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css'
})
export class AdminProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  products: Product[] = [];
  categories: Category[] = [];
  availableSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];
  showModal = false;
  editingProduct: Product | null = null;
  formProduct: Partial<Product> = {};
  loading = true;
  errorMessage = '';

  ngOnInit() {
    const data = this.route.snapshot.data['pageData'] as AdminProductsPageData | undefined;
    if (data) {
      this.products = data.products;
      this.categories = data.categories;
      this.loading = false;
    } else {
      this.errorMessage = 'No se pudo cargar la lista de productos.';
      this.loading = false;
    }
  }

  loadData() {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      products: this.productService.getProducts(),
      categories: this.productService.getCategories()
    }).subscribe({
      next: ({ products, categories }) => {
        this.products = products;
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando productos/admin:', err);
        this.errorMessage = 'No se pudieron cargar los productos.';
        this.loading = false;
      }
    });
  }

  getCategoryName(id: string) {
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

  toggleSize(size: string, checked: boolean) {
    const sizes = this.formProduct.sizes || [];
    if (checked) {
      this.formProduct.sizes = Array.from(new Set([...sizes, size]));
    } else {
      this.formProduct.sizes = sizes.filter(s => s !== size);
    }
  }

  saveProduct() {
    this.loading = true;
    this.errorMessage = '';

    const request = this.editingProduct
      ? this.productService.updateProduct(this.editingProduct.id, this.formProduct)
      : this.productService.createProduct(this.formProduct);

    request.subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error guardando producto:', err);
        this.errorMessage = 'No se pudo guardar el producto.';
        this.loading = false;
      }
    });
  }

  deleteProduct(id: string) {
    if (!confirm('¿Estás seguro de eliminar este producto (borrado lógico)?')) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadData(),
      error: (err) => {
        console.error('Error eliminando producto:', err);
        this.errorMessage = 'No se pudo eliminar el producto.';
        this.loading = false;
      }
    });
  }
}
