import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MeatVisualizer3D } from './components/MeatVisualizer3D';
import { CategoryGrid } from './components/CategoryGrid';
import { CustomBoxBuilder } from './components/CustomBoxBuilder';
import { SteakDonenessCalculator } from './components/SteakDonenessCalculator';
import { TraceabilityStory } from './components/TraceabilityStory';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: 'wagyu-ribeye-a5',
      name: 'Miyazaki Japanese A5 Wagyu Ribeye',
      price: 189,
      quantity: 1,
      customThickness: 1.5,
      customAging: 21,
      calculatedPrice: 189,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.customThickness === product.customThickness);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.customThickness === product.customThickness)
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-sans selection:bg-crimson-600 selection:text-white">
      {/* Header Bar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Page Sections */}
      <main className="flex-1 space-y-12">
        <Hero
          onExploreVisualizer={() => handleNavigate('visualizer')}
          onBuildBox={() => handleNavigate('box-builder')}
        />

        <MeatVisualizer3D
          onAddToCart={handleAddToCart}
          onAddToBox={() => handleNavigate('box-builder')}
        />

        <CategoryGrid
          onAddToCart={handleAddToCart}
        />

        <CustomBoxBuilder
          onAddBoxToCart={(box) => {
            handleAddToCart(box);
            setIsCartOpen(true);
          }}
        />

        <SteakDonenessCalculator />

        <TraceabilityStory />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}

export default App;
