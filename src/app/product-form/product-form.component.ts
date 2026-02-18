import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../app.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  name = signal('');
  price = signal(0);

  @Output() productCreated = new EventEmitter<Product>();

  addProduct() {
    if (this.name().trim() === '' || this.price() <= 0) {
      return;
    }

    const newProduct: Product = {
      id: 0,
      name: this.name(),
      price: this.price()
    };

    this.productCreated.emit(newProduct);
    this.name.set('');
    this.price.set(0);
  }
}