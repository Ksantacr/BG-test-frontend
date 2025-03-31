import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product, ProductBatch, ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7199/api/products'; // Adjust based on your API

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {    
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  /** Fetch all products */
  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching products', error);
        throw error;
      })
    );
  }

  /** Fetch product by ID */
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching product', error);
        throw error;
      })
    );
  }

  /** Add a new product */
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error adding product', error);
        throw error;
      })
    );
  }

  /** Update an existing product */
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating product', error);
        throw error;
      })
    );
  }

  /** Delete a product */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting product', error);
        throw error;
      })
    );
  }

  /** Add a batch number to a product */
  addBatchToProduct(productId: number, batchNumber: string, price: number): Observable<any> {
    const batchData = { productId, batchNumber, price };
    return this.http.post(`${this.apiUrl}/batch-number`, batchData, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error adding batch to product', error);
        throw error;
      })
    );
  }

  /** Fetch all product batches with search and pagination */
  getProductBatches(searchTerm: string = '', page: number = 1, pageSize: number = 10): Observable<ProductBatch[]> {
    const params = `?searchTerm=${searchTerm}`;
    return this.http.post<ProductBatch[]>(`${this.apiUrl}/search${params}`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching product batches', error);
        throw error;
      })
    );
  }
}
