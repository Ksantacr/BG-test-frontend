export interface Product {
    id: number;
    name: string;
    description?: string;
  }

  export interface ProductResponse {
    succeeded: boolean;
    value: Product[];

  }
  
  export interface ProductBatch {
    id: number;
    description: string;
    batchNumber: string;
    price: number;
    registered?: Date;
  }