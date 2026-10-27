export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: number;
  badge?: string; // e.g. "Destacado", "Popular", "Servicio", "Nuevo"
  inStock?: boolean;
  unit?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  tag?: string;
  linkCategory?: string;
  buttonText?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName?: string;
}

export interface CartItem {
  product: Product;
  quantity?: number;
}

export interface StoreSettings {
  companyName: string;
  logoUrl: string;
  whatsappNumber: string; // e.g. "584245104245"
  confirmationMessage: string;
  adminPin: string;
  currencySymbol?: string;
}
