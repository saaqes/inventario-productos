import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  products = signal<Product[]>([]);
  nextId = signal(1);
  totalPrice = computed(() => this.products().reduce((sum, p) => sum + p.price, 0));

  addProduct(product: Product) {
    product.id = this.nextId();
    this.products.update(products => [...products, product]);
    this.nextId.update(id => id + 1);
  }

  deleteProduct(id: number) {
    this.products.update(products => products.filter(p => p.id !== id));
  }
}
