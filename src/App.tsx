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
  loadStoredNochebuena,
  saveStoredNochebuena,
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
import { SnowEffect } from './components/SnowEffect';

export default function App() {
  // Application Data States with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => loadStoredProducts());
  const [banners, setBanners] = useState<Banner[]>(() => loadStoredBanners());
  const [categories, setCategories] = useState<Category[]>(() => loadStoredCategories());
  const [settings, setSettings] = useState<StoreSettings>(() => loadStoredSettings());
  const [cart, setCart] = useState<CartItem[]>(() => loadStoredCart());

  // Festive Christmas Nochebuena Theme State
  const [isNochebuena, setIsNochebuena] = useState<boolean>(() => loadStoredNochebuena());

  // Festive Christmas Snow State
  const [snowEnabled, setSnowEnabled] = useState<boolean>(true);

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
    saveStoredNochebuena(isNochebuena);
  }, [isNochebuena]);

  // Nochebuena Theme Toggle Handler
  const handleToggleNochebuena = () => {
    setIsNochebuena((prev) => !prev);
  };

  // Admin Toggle Handler
  const handleToggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
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
    // Also remove from cart if present
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

  return (
    <div className={`min-h-screen flex flex-col selection:bg-red-500/20 selection:text-red-900 relative overflow-x-hidden ${
      isNochebuena ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* Imagen adjuntada como fondo completo del sitio (compatible con móviles y escritorio) */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/aistudio/1be976004c278360e8da7d8d4bb6e7d5_8d71b2ef.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Filtro Oscuro Nochebuena: oscurece el fondo permitiendo que las luces navideñas, neón y elementos del catálogo resalten con brillo radiante */}
      <div
        className={`fixed inset-0 -z-5 pointer-events-none transition-all duration-700 ease-in-out ${
          isNochebuena ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, rgba(13, 5, 29, 0.88) 0%, rgba(6, 2, 16, 0.94) 100%)',
          backdropFilter: 'brightness(0.55) contrast(1.22) saturate(1.15)',
          WebkitBackdropFilter: 'brightness(0.55) contrast(1.22) saturate(1.15)',
        }}
        aria-hidden="true"
      />

      {/* Falling Christmas Snow */}
      <SnowEffect enabled={snowEnabled} isNochebuena={isNochebuena} />

      {/* 2. Barra Superior (Header Fijo con Logo de Ballón Dulces Khloe) */}
      <Header
        settings={settings}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onOpenSettingsModal={() => setIsAdminSettingsModalOpen(true)}
        snowEnabled={snowEnabled}
        onToggleSnow={() => setSnowEnabled(!snowEnabled)}
        isNochebuena={isNochebuena}
        onToggleNochebuena={handleToggleNochebuena}
      />

      {/* Main Content Area: Padding bottom (pb-36) avoids obscuring by fixed cart button & footer */}
      <main className="flex-1 pb-36 sm:pb-32 bg-transparent">
        {/* Admin status notice banner if active */}
        {isAdmin && (
          <div
            className={`border-b-2 py-2.5 px-4 text-center font-cursive-body backdrop-blur-sm ${
              isNochebuena
                ? 'bg-slate-900/90 border-red-500 ring-1 ring-emerald-500 text-amber-200'
                : 'bg-red-50/90 border-red-600 ring-1 ring-emerald-600 text-red-800'
            }`}
          >
            <p className="text-base font-bold flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Modo Administrador Habilitado: Puedes editar o añadir decoraciones, banners, categorías y WhatsApp.</span>
            </p>
          </div>
        )}

        {/* 3. Carrusel de Banners Publicitarios (Hero Section) */}
        <HeroCarousel
          banners={banners}
          isAdmin={isAdmin}
          isNochebuena={isNochebuena}
          onSelectCategory={(catId) => setActiveCategory(catId)}
          onAddBanner={handleAddBanner}
          onDeleteBanner={handleDeleteBanner}
          onEditBanner={handleEditBanner}
        />

        {/* 4. Sistema de Filtrado por Categorías */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          products={products}
          isAdmin={isAdmin}
          isNochebuena={isNochebuena}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        {/* 5. Cuadrícula de Catálogo (Grid de Productos/Servicios) */}
        <ProductGrid
          products={products}
          settings={settings}
          isAdmin={isAdmin}
          isNochebuena={isNochebuena}
          activeCategory={activeCategory}
          onOpenDetail={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onOpenAddModal={handleOpenAddProduct}
        />
      </main>

      {/* 7. Botón Ancho Flotante "Ver Carrito de Compras" */}
      <FixedCartBar
        cart={cart}
        settings={settings}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 8. Cintillo Inferior Fijo (Footer Persistente S&S Web Studio) */}
      <FooterBar isNochebuena={isNochebuena} />

      {/* 6. Modal de Detalle de Producto */}
      <ProductDetailModal
        product={selectedProduct}
        settings={settings}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 7. Panel Drawer del Carrito & Flujo WhatsApp */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        settings={settings}
        onUpdateQuantity={handleUpdateCartQuantity}
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
        onSaveSettings={handleSaveSettings}
        onResetFactoryData={handleResetFactoryData}
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
