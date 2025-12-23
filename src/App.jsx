import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import ProductCard from './components/product/ProductCard';
import CartSidebar from './components/cart/ CartSidebar';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
// ADD THIS IMPORT:
import { products } from './data/products';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsCartOpen(true);
    window.addEventListener('open-cart', handler);
    return () => window.removeEventListener('open-cart', handler);
  }, []);
  
  // USE YOUR REAL PRODUCTS INSTEAD OF SAMPLE:
  const allProducts = products; // This uses your products.js data

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Your Magnet and All Products */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">All Products</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* USE allProducts NOT products */}
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toast />
    </div>
  );
}

export default App;