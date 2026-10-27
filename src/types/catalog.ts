export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  badge?: string; // e.g. "Destacado", "Oferta", "Servicio", "Nuevo"
  inStock?: boolean;
  unit?: string; // e.g. "u.", "mes", "servicio", "hora"
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
  quantity: number;
}

export interface StoreSettings {
  companyName: string;
  logoUrl: string;
  whatsappNumber: string; // e.g. "584245104245"
  currencySymbol: string; // e.g. "$"
  confirmationMessage: string;
  adminPin: string;
}
