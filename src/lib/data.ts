import type { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Lenovo LOQ 2024 13th Gen Core i7',
    description: '13650HX |NVIDIA RTX 4060 8GB (24GB RAM/512GB SSD/144Hz Refresh Rate/15.6" (39.6cm)/Windows 11/MS Office 2021/3 Mon Game Pass/Grey/2.4Kg)',
    price: 129999,
    imageUrl: 'https://m.media-amazon.com/images/I/611sWokzP1L._SX679_.jpg',
    category: 'Electronics',
    stock: 25,
    reviews: [
      { id: 'r1', productId: '1', userId: 'u1', userName: 'Alice', rating: 5, comment: 'Amazing speed and display!', createdAt: new Date() },
      { id: 'r2', productId: '1', userId: 'u2', userName: 'Bob', rating: 4, comment: 'Great value for the price.', createdAt: new Date() },
    ],
    averageRating: 4.5,
  },
  {
    id: '2',
    name: 'Sony WH-CH520',
    description: 'Wireless Bluetooth Headphones with Mic, Up to 50Hrs Battery-Blue',
    price: 3989,
    imageUrl: 'https://m.media-amazon.com/images/I/61zWFqX+krL._SX522_.jpg',
    category: 'Electronics',
    stock: 30,
    reviews: [
      { id: 'r3', productId: '2', userId: 'u3', userName: 'Charlie', rating: 5, comment: 'Best headphones I\'ve ever owned.', createdAt: new Date() },
    ],
    averageRating: 5,
  },
  {
    id: '3',
    name: 'U.S. POLO ASSNt',
    description: 'Soft and comfortable Mens Cotton Regular Fit ',
    price: 1186,
    imageUrl: 'https://m.media-amazon.com/images/I/71tz47oZ54L._SX679_.jpg',
    category: 'Apparel',
    stock: 50,
    reviews: [
       { id: 'r4', productId: '3', userId: 'u1', userName: 'Alice', rating: 4, comment: 'Very soft, fits well.', createdAt: new Date() },
    ],
    averageRating: 4,
  },
    {
    id: '4',
    name: 'ASICS Men Lace Up Running Shoes',
    description: 'Lightweight and responsive running shoes for peak performance.',
    price: 7649,
    imageUrl: 'https://m.media-amazon.com/images/I/71EfBxxEzWL._SY695_.jpg',
    category: 'Footwear',
    stock: 45,
    reviews: [
      { id: 'r5', productId: '4', userId: 'u2', userName: 'Bob', rating: 5, comment: 'Perfect for my daily runs!', createdAt: new Date() },
      { id: 'r6', productId: '4', userId: 'u4', userName: 'David', rating: 4, comment: 'Comfortable but took time to break in.', createdAt: new Date() },
    ],
    averageRating: 4.5,
  },
  {
    id: '5',
    name: 'Echo Dot (5th Gen)',
    description: 'Smart speaker with Bigger sound, Motion Detection, Temperature Sensor, Alexa and Bluetooth| Black',
    price: 5499,
    imageUrl: 'https://m.media-amazon.com/images/I/8191db+HfLL._SY450_.jpg',
    category: 'Electronics',
    stock: 10,
    reviews: [],
  },
  {
    id: '6',
    name: 'Luis Leather Mens ',
    description: 'Tan Lambskin Leather Zipper Front Hoodie Jacket Leather Jacket Detachable Hood',
    price: 14589,
    imageUrl: 'https://m.media-amazon.com/images/I/71YUvx+rr4L._SY879_.jpg',
    category: 'Apparel',
    stock: 5,
    reviews: [
       { id: 'r7', productId: '6', userId: 'u5', userName: 'Eve', rating: 5, comment: 'High quality leather, looks great.', createdAt: new Date() },
    ],
    averageRating: 5,
  },
   {
    id: '7',
    name: 'MokkaFarms Roasted Whole Coffee ',
    description: '1 Kg - 100% Robusta | Medium-Dark Roast, Fresh Estate Coffee | Graded A/AA Bean | Rich Flavorful Aromatic ',
    price: 949,
    imageUrl: 'https://m.media-amazon.com/images/I/71njpPqW7GL._SX679_.jpg',
    category: 'Groceries',
    stock: 100,
    reviews: [
      { id: 'r8', productId: '7', userId: 'u3', userName: 'Charlie', rating: 5, comment: 'Makes the best morning coffee.', createdAt: new Date() },
    ],
    averageRating: 5,
  },
  {
    id: '8',
    name: 'Boldfit Yoga Mats for Women and Men ',
    description: 'NBR Material with Carrying Strap, Extra Thick Exercise Mats for Workout Yoga Mat for Women for Workout, Yoga, Fitness, Exercise',
    price: 599,
    imageUrl: 'https://m.media-amazon.com/images/I/61dxlMJXeLL._SX679_.jpg',
    category: 'Sports',
    stock: 20,
    reviews: [
      { id: 'r9', productId: '8', userId: 'u4', userName: 'Rizzler', rating: 4.5, comment: 'Good and Conftable for Yoga', createdAt: new Date() }
    ], averageRating: 4.5
  },

  {
    id: '9',
    name: 'iPhone 16 128GB',
    description: '15G Mobile Phone with Camera Control, A18 Chip and a Big Boost in Battery Life. Works with AirPods; Black',
    price: 72490,
    imageUrl: 'https://m.media-amazon.com/images/I/61135j8fPJL._SX679_.jpg',
    category: 'Electronics',
    stock: 20,
    reviews: [
{ id: 'r10', productId: '9', userId: 'u5', userName: 'Himmler', rating: 4.5, comment: 'Great Camera!', createdAt: new Date() }

    ], averageRating: 4.5
  },
   {
    id: '10',
    name: 'Apple iPad Air 13″ (M2)',
    description: 'Liquid Retina Display, 128GB, Landscape 12MP Front Camera / 12MP Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Grey',
    price: 79990,
    imageUrl: 'https://m.media-amazon.com/images/I/71Lcaat+UUL._SX679_.jpg',
    category: 'Electronics',
    stock: 20,
    reviews: [
{ id: 'r11', productId: '10', userId: 'u4', userName: 'Rizzler', rating: 4.5, comment: 'Great Camera!', createdAt: new Date() }

    ], averageRating: 4.5
  },
     {
    id: '11',
    name: 'Boult Audio Z40',
    description: 'True Wireless in Ear Earbuds with 60H Playtime, Zen™ ENC Mic, Low Latency Gaming',
    price: 999,
    imageUrl: 'https://m.media-amazon.com/images/I/41qzxIKrWkL._SX300_SY300_QL70_FMwebp_.jpg',
    category: 'Accessories',
    stock: 60,
    reviews: [],
  },
   {
    id: '12',
    name: 'Fire-Boltt Ninja Call Pro',
    description: 'Plus Smart Watch 1.83 inch with Bluetooth Calling, AI Voice Assistance, 100 Sports Modes IP67 Rating, 240 * 280 Pixel High Resolution',
    price: 1399,
    imageUrl: 'https://m.media-amazon.com/images/I/41O7YJM+9+L._SY300_SX300_.jpg',
    category: 'Electronics',
    stock: 20,
    reviews: [],
  },
   {
    id: '13',
    name: 'Noise Power Series 100W',
    description: 'Super Fast Charging Adapter, 4 Ports (3 USB-C Type, 1 USB-A),',
    price: 3999,
    imageUrl: 'https://m.media-amazon.com/images/I/31PPBLxg6fL._SX300_SY300_QL70_FMwebp_.jpg',
    category: 'Accessories',
    stock: 25,
    reviews: [],
  },
   {
    id: '14',
    name: 'Vector X VXT-520',
    description: 'Strung Tennis Racquet/Rackets (26-inch, Full Cover)',
    price: 1299,
    imageUrl: 'https://m.media-amazon.com/images/I/61lf3IMGC-L._SX679_.jpg',
    category: 'Sports',
    stock: 26,
    reviews: [],
  },
   {
    id: '15',
    name: 'PULOKA - Mobile Cover for iPhone 15 PRO',
    description: 'Horse Embroidery - Sleek & Stylish - Protective & Anti Scratch',
    price: 1199,
    imageUrl: 'https://m.media-amazon.com/images/I/51btvZs8YAL._SX522_.jpg',
    category: 'Accessories',
    stock: 200,
    reviews: [],
  },
   {
    id: '16',
    name: 'Taj Mahal Tea',
    description: 'With Long Leaves, 500 Gram, Black Tea',
    price: 330,
    imageUrl: 'https://m.media-amazon.com/images/I/61OKvFHvHUL._SX679_.jpg',
    category: 'Groceries',
    stock: 250,
    reviews: [],
  },
  

];

// Mock function to simulate fetching products (replace with actual API call later)
export async function fetchProducts(filters: { query?: string; category?: string } = {}): Promise<Product[]> {
  console.log("Fetching products with filters:", filters);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredProducts = mockProducts;

  if (filters.query) {
    const queryLower = filters.query.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(queryLower) ||
      product.description.toLowerCase().includes(queryLower)
    );
  }

  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  console.log("Returning filtered products:", filteredProducts);
  return filteredProducts;
}

// Mock function to simulate fetching a single product
export async function fetchProductById(id: string): Promise<Product | undefined> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.find(p => p.id === id);
}

// Mock function to simulate submitting a review
export async function submitReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
   // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const newReview: Review = {
    ...review,
    id: `r${Math.random().toString(36).substring(7)}`, // Generate simple random ID
    createdAt: new Date(),
  };

  // In a real app, you would update the product's reviews in the database
  const productIndex = mockProducts.findIndex(p => p.id === review.productId);
  if (productIndex !== -1) {
     mockProducts[productIndex].reviews.push(newReview);
     // Recalculate average rating (simple example)
     const totalRating = mockProducts[productIndex].reviews.reduce((sum, r) => sum + r.rating, 0);
     mockProducts[productIndex].averageRating = totalRating / mockProducts[productIndex].reviews.length;
  }

  console.log("Submitted review:", newReview);
  return newReview;
}
