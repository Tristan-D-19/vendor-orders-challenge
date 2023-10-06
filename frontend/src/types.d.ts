interface OrderSubmission {
    vendor: string,
    date: Date,
    file: File,
}

interface Product  {
    vendor?: string;
    unitPrice: number;
    quantity: number;
    modelNumber: string;
  };

 interface Order {
    vendorId?: string | null,
    vendor: string, 
    id: string;
    products?: Product[],
    dateAdded: Date;
    date: Date;
  }
  