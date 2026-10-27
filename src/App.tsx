import React, { useState, useEffect } from 'react';
import { Product, Banner, Category, StoreSettings, CartItem } from './types/catalog';
import {
  loadStoredProducts,
  saveStoredProducts,
  loadStoredBanners,
  saveStoredBanners,
  loadStoredCategories,
  saveStoredCategories,
  loadStoredSettings,
  saveStoredSettings,
  loadStoredCart,
  saveStoredCart,
  loadStoredDarkMode,
  saveStoredDarkMode,
} from './utils/storage';
import { INITIAL_PRODUCTS, INITIAL_BANNERS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from './data/initialData';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { FixedCartBar } from './components/FixedCartBar';
import { FooterBar } from './components/FooterBar';
import { AdminProductModal } from './components/AdminProductModal';
import { AdminBannerModal } from './components/AdminBannerModal';
import { AdminSettingsModal } from './components/AdminSettingsModal';
import { AdminLoginModal } from './components/AdminLoginModal';

export default function App() {
  // Application Data States with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => loadStoredProducts());
  const [banners, setBanners] = useState<Banner[]>(() => loadStoredBanners());
  const [categories, setCategories] = useState<Category[]>(() => loadStoredCategories());
  const [settings, setSettings] = useState<StoreSettings>(() => loadStoredSettings());
  const [cart, setCart] = useState<CartItem[]>(() => loadStoredCart());

  // Dark / Light Mode State (default active)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => loadStoredDarkMode());

  // Navigation & Filtering
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  // Admin Mode State
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Modals & Drawers States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminProductModalOpen, setIsAdminProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdminBannerModalOpen, setIsAdminBannerModalOpen] = useState<boolean>(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isAdminSettingsModalOpen, setIsAdminSettingsModalOpen] = useState<boolean>(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    saveStoredProducts(products);
  }, [products]);

  useEffect(() => {
    saveStoredBanners(banners);
  }, [banners]);

  useEffect(() => {
    saveStoredCategories(categories);
  }, [categories]);

  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  useEffect(() => {
    saveStoredDarkMode(isDarkMode);
  }, [isDarkMode]);

  // Dark Mode Toggle
  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Admin Toggle Handler
  const handleToggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  // Cart / Quote List Handlers (No quantities - single item per selection)
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) return prev; // Already in quote list
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsAdminProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAdminProductModalOpen(true);
  };

  const handleSaveProduct = (product: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [product, ...prev];
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Banner CRUD
  const handleAddBanner = (newBanner: Banner) => {
    setBanners((prev) => [...prev, newBanner]);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setIsAdminBannerModalOpen(true);
  };

  const handleSaveBanner = (banner: Banner) => {
    setBanners((prev) => prev.map((b) => (b.id === banner.id ? banner : b)));
  };

  const handleDeleteBanner = (bannerId: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== bannerId));
  };

  // Category CRUD
  const handleAddCategory = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'cat_' + Date.now();
    const newCat: Category = { id, name };
    setCategories((prev) => [...prev, newCat]);
    setActiveCategory(id);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    if (activeCategory === categoryId) {
      setActiveCategory('todos');
    }
  };

  // Settings & Factory Reset
  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
  };

  const handleResetFactoryData = () => {
    setProducts(INITIAL_PRODUCTS);
    setBanners(INITIAL_BANNERS);
    setCategories(INITIAL_CATEGORIES);
    setSettings(INITIAL_SETTINGS);
    setCart([]);
    setActiveCategory('todos');
  };

  const handleImportFullData = (data: {
    products?: Product[];
    banners?: Banner[];
    categories?: Category[];
    settings?: StoreSettings;
  }) => {
    if (Array.isArray(data.products) && data.products.length > 0) setProducts(data.products);
    if (Array.isArray(data.banners) && data.banners.length > 0) setBanners(data.banners);
    if (Array.isArray(data.categories) && data.categories.length > 0) setCategories(data.categories);
    if (data.settings) setSettings(data.settings);
  };

  const selectedProductIds = cart.map((item) => item.product.id);

  return (
    <div className={`min-h-screen flex flex-col selection:bg-pink-500/20 selection:text-pink-900 relative overflow-x-hidden ${
      isDarkMode ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* Background Image: Celebration Balloons Background */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/aistudio/1be976004c278360e8da7d8d4bb6e7d5_8d71b2ef.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Dark Mode Gradient Filter */}
      <div
        className={`fixed inset-0 -z-5 pointer-events-none transition-all duration-700 ease-in-out ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, rgba(18, 8, 38, 0.9) 0%, rgba(10, 4, 24, 0.95) 100%)',
          backdropFilter: 'brightness(0.65) contrast(1.15) saturate(1.1)',
          WebkitBackdropFilter: 'brightness(0.65) contrast(1.15) saturate(1.1)',
        }}
        aria-hidden="true"
      />

      {/* Header Fijo con Logo de Ballón Dulces Khloe */}
      <Header
        settings={settings}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onOpenSettingsModal={() => setIsAdminSettingsModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-32 sm:pb-30 bg-transparent">
        {/* Admin status notice banner if active */}
        {isAdmin && (
          <div
            className={`border-b py-2 px-4 text-center font-cursive-body backdrop-blur-sm ${
              isDarkMode
                ? 'bg-slate-900/90 border-pink-500 text-pink-200'
                : 'bg-pink-50/90 border-pink-400 text-purple-900'
            }`}
          >
            <p className="text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span>Modo Administrador Activo: Puedes añadir o editar decoraciones, subir imágenes a la red y cambiar categorías.</span>
            </p>
          </div>
        )}

        {/* Carrusel de Banners Publicitarios (Hero Section) */}
        <HeroCarousel
          banners={banners}
          isAdmin={isAdmin}
          isDarkMode={isDarkMode}
          onSelectCategory={(catId) => setActiveCategory(catId)}
          onAddBanner={handleAddBanner}
          onDeleteBanner={handleDeleteBanner}
          onEditBanner={handleEditBanner}
        />

        {/* Sistema de Filtrado por Categorías */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          products={products}
          isAdmin={isAdmin}
          isDarkMode={isDarkMode}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        {/* Cuadrícula de Catálogo (Grid de Productos/Servicios) */}
        <ProductGrid
          products={products}
          settings={settings}
          isAdmin={isAdmin}
          isDarkMode={isDarkMode}
          activeCategory={activeCategory}
          selectedProductIds={selectedProductIds}
          onOpenDetail={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onOpenAddModal={handleOpenAddProduct}
        />
      </main>

      {/* Botón Flotante "Ver Lista de Cotización" */}
      <FixedCartBar
        cart={cart}
        settings={settings}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cintillo Inferior Fijo (Footer Persistente S&S Web Studio) */}
      <FooterBar isDarkMode={isDarkMode} />

      {/* Modal de Detalle de Producto */}
      <ProductDetailModal
        product={selectedProduct}
        settings={settings}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Panel Drawer de Cotización & Flujo WhatsApp */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        settings={settings}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Admin Modals */}
      <AdminProductModal
        isOpen={isAdminProductModalOpen}
        onClose={() => {
          setIsAdminProductModalOpen(false);
          setEditingProduct(null);
        }}
        productToEdit={editingProduct}
        categories={categories}
        settings={settings}
        onSave={handleSaveProduct}
      />

      <AdminBannerModal
        isOpen={isAdminBannerModalOpen}
        onClose={() => {
          setIsAdminBannerModalOpen(false);
          setEditingBanner(null);
        }}
        banner={editingBanner}
        categories={categories}
        onSave={handleSaveBanner}
      />

      <AdminSettingsModal
        isOpen={isAdminSettingsModalOpen}
        onClose={() => setIsAdminSettingsModalOpen(false)}
        settings={settings}
        products={products}
        banners={banners}
        categories={categories}
        onSaveSettings={handleSaveSettings}
        onResetFactoryData={handleResetFactoryData}
        onImportFullData={handleImportFullData}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={() => setIsAdmin(true)}
        storedPin={settings.adminPin}
      />

    </div>
  );
}
