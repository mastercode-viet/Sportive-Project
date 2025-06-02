export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: number[];
  description: string;
  featured: boolean;
  isNew: boolean;
  onSale: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Air Max Professional",
    price: 1299000,
    originalPrice: 1599000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "sneakers",
    brand: "Nike",
    colors: ["black", "white", "red"],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    description: "Giày thể thao cao cấp với công nghệ Air Max tiên tiến",
    featured: true,
    isNew: false,
    onSale: true
  },
  {
    id: "2",
    name: "Classic Leather Boots",
    price: 2199000,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    category: "boots",
    brand: "Timberland",
    colors: ["brown", "black"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    description: "Boots da thật cao cấp phong cách cổ điển",
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    id: "3",
    name: "Running Ultra Light",
    price: 999000,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
    category: "running",
    brand: "Adidas",
    colors: ["blue", "white", "gray"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    description: "Giày chạy bộ siêu nhẹ với đệm tối ưu",
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: "4",
    name: "Street Style High",
    price: 1599000,
    originalPrice: 1899000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "sneakers",
    brand: "Converse",
    colors: ["black", "white", "red", "blue"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    description: "Giày cao cổ phong cách đường phố",
    featured: true,
    isNew: false,
    onSale: true
  },
  {
    id: "5",
    name: "Formal Oxford",
    price: 1799000,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop",
    category: "formal",
    brand: "Clarks",
    colors: ["black", "brown"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    description: "Giày tây da thật sang trọng cho doanh nhân",
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    id: "6",
    name: "Casual Slip-On",
    price: 899000,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    category: "casual",
    brand: "Vans",
    colors: ["navy", "gray", "white"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    description: "Giày slip-on thoải mái cho mọi hoàn cảnh",
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    id: "7",
    name: "Basketball Pro",
    price: 2499000,
    image: "https://images.unsplash.com/photo-1552066344-2464c1135c32?w=400&h=400&fit=crop",
    category: "basketball",
    brand: "Jordan",
    colors: ["white", "black", "red"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    description: "Giày bóng rổ chuyên nghiệp với hiệu suất cao",
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    id: "8",
    name: "Women's Heels",
    price: 1399000,
    originalPrice: 1699000,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    category: "heels",
    brand: "Christian Louboutin",
    colors: ["black", "red", "nude"],
    sizes: [35, 36, 37, 38, 39, 40],
    description: "Giày cao gót thời trang cho phụ nữ hiện đại",
    featured: false,
    isNew: false,
    onSale: true
  }
];

export const categories = [
  { id: "all", name: "Tất cả", slug: "all" },
  { id: "sneakers", name: "Giày thể thao", slug: "sneakers" },
  { id: "boots", name: "Boots", slug: "boots" },
  { id: "running", name: "Giày chạy bộ", slug: "running" },
  { id: "formal", name: "Giày tây", slug: "formal" },
  { id: "casual", name: "Giày casual", slug: "casual" },
  { id: "basketball", name: "Giày bóng rổ", slug: "basketball" },
  { id: "heels", name: "Giày cao gót", slug: "heels" }
];

export const brands = [
  "Nike", "Adidas", "Converse", "Vans", "Timberland", "Clarks", "Jordan", "Christian Louboutin"
];
