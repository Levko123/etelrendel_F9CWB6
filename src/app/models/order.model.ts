export interface Order {
  customerName: string;
  address: string;
  paymentMethod: 'cash' | 'card';
  items?: any[];
  totalPrice?: number;
  createdAt?: Date;
}
