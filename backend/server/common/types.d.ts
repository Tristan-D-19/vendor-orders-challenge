
export interface Order {
    vendorId?: string | null,
    vendor: string, 
    id: string;
    products?: Product[],
    dateAdded: Date;
    date: Date;
  }
  
  export interface Vendor {
    id: string;
    name: string;

  }
  
  export interface Product {
    id: string,
    modelNumber: string;
    unitPrice: number;
    quantity: number;
    orderId: string;
    
  }