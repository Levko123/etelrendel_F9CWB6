export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;   // kérdőjel => opcionális
    categoryId: string;  // kapcsolódik Category-hoz
  }
  