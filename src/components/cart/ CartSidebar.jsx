import React from 'react';
import { FiX, FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiPackage } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // ADD THIS IMPORT
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ADD THIS HOOK
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);

  const handleQuantityChange = (cartItemId, change) => {
    const item = items.find(item => item.cartItemId === cartItemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      dispatch(updateQuantity({ cartItemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (cartItemId) => {
    if (window.confirm('Remove this item from cart?')) {
      dispatch(removeFromCart(cartItemId));
    }
  };

  const calculateTotals = () => {
    const subtotal = totalPrice;
    const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 49) : 0;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  };

  // ADD THIS FUNCTION FOR CHECKOUT BUTTON
  const handleCheckout = () => {
    onClose(); // Close sidebar first
    // Small delay to let sidebar close animation complete
    setTimeout(() => {
      navigate('/checkout');
    }, 100);
  };

  const totals = calculateTotals();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FiShoppingCart size={24} className="text-orange-500" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Shopping Cart</h2>
                <p className="text-sm text-gray-500">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <FiShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some amazing products to get started!</p>
                <button 
                  onClick={onClose}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.cartItemId} className="bg-white border rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-start space-x-3">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image || 'https://via.placeholder.com/80'} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                        {item.options && (
                          <div className="text-xs text-gray-500 mt-1">
                            {item.options.type && <div>Type: {item.options.type}</div>}
                            {item.options.finish && <div>Finish: {item.options.finish}</div>}
                            {item.options.thickness && <div>Thickness: {item.options.thickness}</div>}
                            {item.options.theme && (
                              <div className="mt-1">
                                <img src={item.options.theme} alt="theme" className="w-12 h-8 object-cover rounded" />
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Price */}
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-orange-500">₱{item.price}</span> {/* Changed ₹ to ₱ */}
                          {item.discount && (
                            <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                              {item.discount}% OFF
                            </span>
                          )}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border rounded-lg">
                            <button 
                              onClick={() => handleQuantityChange(item.cartItemId, -1)}
                              className="px-3 py-1.5 hover:bg-gray-100 transition-colors rounded-l-lg"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                            </button>
                            <span className="px-4 py-1.5 border-x text-center min-w-[40px]">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(item.cartItemId, 1)}
                              className="px-3 py-1.5 hover:bg-gray-100 transition-colors rounded-r-lg"
                            >
                              <FiPlus size={16} className="text-gray-600" />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => handleRemoveItem(item.cartItemId)}
                            className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="mt-3 pt-3 border-t text-right">
                      <span className="text-gray-600">Item Total: </span>
                      <span className="font-bold text-lg">₱{item.price * item.quantity}</span> {/* Changed ₹ to ₱ */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Order Summary */}
          {items.length > 0 && (
            <div className="border-t bg-gray-50">
              <div className="p-4 space-y-3">
                {/* Summary Title */}
                <div className="flex items-center space-x-2 mb-2">
                  <FiPackage size={20} className="text-orange-500" />
                  <h3 className="font-bold text-lg">Order Summary</h3>
                </div>
                
                {/* Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₱{totals.subtotal.toFixed(2)}</span> {/* Changed ₹ to ₱ */}
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={totals.shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {totals.shipping === 0 ? 'FREE' : `₱${totals.shipping}`} {/* Changed ₹ to ₱ */}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span>₱{totals.tax.toFixed(2)}</span> {/* Changed ₹ to ₱ */}
                  </div>
                  
                  {/* Divider */}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-orange-500">₱{totals.total.toFixed(2)}</span> {/* Changed ₹ to ₱ */}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>
                </div>
                
                {/* Action Buttons - UPDATED CHECKOUT BUTTON */}
                <div className="space-y-3 pt-4">
                  <button 
                    onClick={handleCheckout} // ADDED onClick HERE
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-md"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => dispatch(clearCart())}
                      className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button 
                      onClick={onClose}
                      className="flex-1 bg-white text-orange-500 border border-orange-500 py-2.5 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Have a promo code?</p>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="flex-1 border border-r-0 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-900 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;