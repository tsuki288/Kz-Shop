import React from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);

  const handleQuantityChange = (cartItemId, change) => {
    const item = items.find(item => item.cartItemId === cartItemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      dispatch(updateQuantity({ cartItemId, quantity: newQuantity }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <FiShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({totalItems} items)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.cartItemId} className="bg-white rounded-lg shadow-sm border p-4 flex items-center">
              <img 
                src={item.image || 'https://via.placeholder.com/100'} 
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{item.name}</h3>
                {item.options && (
                  <div className="text-xs text-gray-500 mt-1">
                    {item.options.type && <div>Type: {item.options.type}</div>}
                    {item.options.finish && <div>Finish: {item.options.finish}</div>}
                    {item.options.thickness && <div>Thickness: {item.options.thickness}</div>}
                    {item.options.theme && (
                      <div className="mt-1">
                        <img src={item.options.theme} alt="theme" className="w-20 h-12 object-cover rounded" />
                      </div>
                    )}
                  </div>
                )}
                <p className="text-orange-500 font-bold">₱{item.price}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center border rounded">
                    <button 
                      onClick={() => handleQuantityChange(item.cartItemId, -1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="px-3 py-1 border-x w-12 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.cartItemId, 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => dispatch(removeFromCart(item.cartItemId))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold">₱{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => dispatch(clearCart())}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Clear Cart
          </button>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₱{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₱{(totalPrice * 0.18).toFixed(2)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-500">
                  ₱{(totalPrice + (totalPrice * 0.18)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;