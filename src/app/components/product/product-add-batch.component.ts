import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-add-batch',
  templateUrl: './product-add-batch.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink],
  styleUrls: ['./product-add-batch.component.css']
})
export class ProductAddBatchComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number | null = null;
  batchNumber: string = '';
  price: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products.value),
      error: (error) => console.error('Error fetching products', error)
    });
  }

  addBatch(): void {
    if (!this.selectedProductId || !this.batchNumber || this.price <= 0) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    this.productService.addBatchToProduct(this.selectedProductId, this.batchNumber, this.price).subscribe({
      next: () => {
        this.successMessage = 'Batch added successfully!';
        this.errorMessage = '';
      },
      error: () => {
        this.successMessage = '';
        this.errorMessage = 'Failed to add batch';
      }
    });
  }
}
