import React from 'react';
import { FiHeart, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsLightningCharge } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  
  const isInCart = cartItems.some(item => item.id === product.id);
  
  // Debug: Check product images
  console.log(`Product ${product.id} images:`, product.images);
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || 'https://via.placeholder.com/300',
      discount: product.discount,
    }));
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
    >
      <div className="relative pt-[100%] sm:pt-[75%]">
        {/* FIXED IMAGE SOURCE */}
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover p-2"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300';
            console.log('Image failed to load:', product.images?.[0]);
          }}
        />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            console.log('Added to wishlist');
          }}
          className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FiHeart className="text-gray-600 sm:text-gray-500" size={16} />
        </button>
        
        {product.isFlashSale && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] sm:text-xs px-2 py-1 rounded flex items-center">
            <BsLightningCharge size={10} className="mr-1" />
            <span className="hidden xs:inline">Flash</span> Sale
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3">
        <h3 className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-1 sm:mb-2 min-h-[2rem] sm:min-h-[2.5rem] hover:text-orange-500">
          {product.name}
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1 sm:mb-2">
          <span className="text-base sm:text-lg font-bold text-orange-500">
            ₱{product.price.toLocaleString()}
          </span>
          
          {product.originalPrice && (
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                ₱{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-1 sm:px-1.5 py-0.5 rounded">
                {product.discount}% off
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 mb-2 sm:mb-3">
          <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded">
            <FiStar className="text-yellow-400 fill-current" size={12} />
            <span className="text-xs font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500">
            ({product.reviews > 1000 ? `${(product.reviews/1000).toFixed(1)}k` : product.reviews} reviews)
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full flex items-center justify-center space-x-2 px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 ${
            isInCart 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {isInCart ? (
            <>
              <FiShoppingCart />
              <span>Added</span>
            </>
          ) : (
            <>
              <FiShoppingCart />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;