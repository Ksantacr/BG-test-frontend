import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductBatch } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  batches: ProductBatch[] = [];
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getBatches();
  }

  getBatches(): void {
    this.productService.getProductBatches(this.searchTerm, this.page, this.pageSize).subscribe({
      next: (response: ProductBatch[]) => {
        this.batches = response;
      },
      error: (error) => console.error('Error fetching batches', error)
    });
  }

  onSearch(): void {
    this.page = 1; // Reset pagination
    this.getBatches();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.getBatches();
  }
}
