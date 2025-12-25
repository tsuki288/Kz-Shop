import React from 'react';
import { FiSearch, FiShoppingCart, FiMenu } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Header = ({ onCartClick }) => {  // <-- ADD THIS PROP
  const totalItems = useSelector(state => state.cart.totalItems);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <button className="lg:hidden">
              <FiMenu size={24} />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
              <span className="text-xl font-bold text-orange-500">Kz Crafting</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-l-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-r-lg font-medium hover:bg-orange-600 whitespace-nowrap">
              Search
            </button>
          </div>

          <div className="flex items-center">
            {/* ADD onClick HERE */}
            <button 
              onClick={onCartClick}  // <-- ADD THIS
              className="relative"
            >
              <FiShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden py-3 border-t">
          <div className="flex">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-l-lg focus:outline-none text-sm"
              />
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;