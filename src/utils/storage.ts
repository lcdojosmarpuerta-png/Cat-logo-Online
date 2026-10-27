import { Product, Banner, Category, StoreSettings, CartItem } from '../types/catalog';
import { INITIAL_PRODUCTS, INITIAL_BANNERS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from '../data/initialData';

const KEYS = {
  PRODUCTS: 'catalog_products_v3',
  BANNERS: 'catalog_banners_v3',
  CATEGORIES: 'catalog_categories_v3',
  SETTINGS: 'catalog_settings_v3',
  CART: 'catalog_cart_v3',
  IS_ADMIN: 'catalog_is_admin_v3',
  DARK_MODE: 'catalog_theme_dark_v3',
};

export const loadStoredDarkMode = (): boolean => {
  try {
    const item = localStorage.getItem(KEYS.DARK_MODE);
    if (item === null) return true; // Modo oscuro predeterminado
    return item === 'true';
  } catch {
    return true;
  }
};

export const saveStoredDarkMode = (enabled: boolean): void => {
  try {
    localStorage.setItem(KEYS.DARK_MODE, String(enabled));
  } catch (e) {
    console.error('Failed to save dark theme to localStorage', e);
  }
};

// Aliases for compatibility
export const loadStoredNochebuena = loadStoredDarkMode;
export const saveStoredNochebuena = saveStoredDarkMode;

export const loadStoredProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(KEYS.PRODUCTS);
    if (!raw) return INITIAL_PRODUCTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
  } catch (e) {
    console.error('Failed to load products from localStorage', e);
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products to localStorage', e);
  }
};

export const loadStoredBanners = (): Banner[] => {
  try {
    const raw = localStorage.getItem(KEYS.BANNERS);
    if (!raw) return INITIAL_BANNERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BANNERS;
  } catch (e) {
    console.error('Failed to load banners from localStorage', e);
    return INITIAL_BANNERS;
  }
};

export const saveStoredBanners = (banners: Banner[]): void => {
  try {
    localStorage.setItem(KEYS.BANNERS, JSON.stringify(banners));
  } catch (e) {
    console.error('Failed to save banners to localStorage', e);
  }
};

export const loadStoredCategories = (): Category[] => {
  try {
    const raw = localStorage.getItem(KEYS.CATEGORIES);
    if (!raw) return INITIAL_CATEGORIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CATEGORIES;
  } catch (e) {
    console.error('Failed to load categories from localStorage', e);
    return INITIAL_CATEGORIES;
  }
};

export const saveStoredCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error('Failed to save categories to localStorage', e);
  }
};

export const loadStoredSettings = (): StoreSettings => {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (!raw) return INITIAL_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_SETTINGS, ...parsed };
  } catch (e) {
    console.error('Failed to load settings from localStorage', e);
    return INITIAL_SETTINGS;
  }
};

export const saveStoredSettings = (settings: StoreSettings): void => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage', e);
  }
};

export const loadStoredCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(KEYS.CART);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load cart from localStorage', e);
    return [];
  }
};

export const saveStoredCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
};

/**
 * Compresses an image file from an <input type="file"> and returns a data URL.
 * Resizes down to max 1000px and converts to WebP/JPEG to prevent localStorage quota exhaustion.
 */
export const compressImageFile = (file: File, maxWidth = 1000, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch {
          resolve(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
