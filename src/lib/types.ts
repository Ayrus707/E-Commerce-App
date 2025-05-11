
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  reviews: Review[];
  averageRating?: number; // Optional: Calculated average rating
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string; // Or userName if user details aren't deeply linked yet
  userName: string;
  rating: number; // e.g., 1-5 stars
  comment: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other relevant user fields like address, order history etc.
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
