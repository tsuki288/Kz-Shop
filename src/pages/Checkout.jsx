import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowLeft, FiTruck, FiCreditCard, FiPackage } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import ProductCustomization from '../components/checkout/ProductCustomization';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(state => state.cart);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirm
  const [orderComplete, setOrderComplete] = useState(false);
  const [customizations, setCustomizations] = useState({});

  // Form states
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    notes: ''
  });

  const [payment, setPayment] = useState({
    method: 'cod', // cod, gcash, bank
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const calculateTotals = () => {
    const subtotal = totalPrice;
    const shipping = 50; // Fixed shipping
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  };

  const totals = calculateTotals();

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    // In real app, send order to backend
    console.log('Order placed:', { address, payment, items });
    
    // Generate order ID
    const orderId = 'ORD-' + Date.now();
    
    // Clear cart and show success
    dispatch(clearCart());
    setOrderComplete(true);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🛒</div>
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-500" size={40} />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="font-bold text-lg mb-2">Order Summary</p>
            <div className="text-left space-y-2">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>₱{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₱{totals.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₱{totals.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-orange-500">₱{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/orders')}
              className="bg-white text-orange-500 border border-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-orange-50"
            >
              View Order Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
          >
            <FiArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg"></div>
            <span className="text-2xl font-bold text-orange-500">KsShop</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center">
            {['Shipping Address', 'Payment Method', 'Confirmation'].map((title, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step > index + 1 ? 'bg-green-500 text-white' :
                  step === index + 1 ? 'bg-orange-500 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > index + 1 ? <FiCheck /> : index + 1}
                </div>
                <span className={`text-sm ${step >= index + 1 ? 'font-medium' : 'text-gray-500'}`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Address Form */}
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FiTruck className="mr-2" />
                  Shipping Address
                </h2>
                
                <form onSubmit={handleAddressSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={address.fullName}
                        onChange={(e) => setAddress({...address, fullName: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        placeholder="Juan Dela Cruz"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={(e) => setAddress({...address, phone: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        placeholder="09123456789"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Complete Address *</label>
                      <input
                        type="text"
                        required
                        value={address.address}
                        onChange={(e) => setAddress({...address, address: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        placeholder="Street, Barangay"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        placeholder="City"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Province *</label>
                      <input
                        type="text"
                        required
                        value={address.province}
                        onChange={(e) => setAddress({...address, province: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        placeholder="Province"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        required
                        value={address.zipCode}
                        onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        placeholder="1000"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Delivery Notes (Optional)</label>
                    <textarea
                      value={address.notes}
                      onChange={(e) => setAddress({...address, notes: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 h-32"
                      placeholder="Any special delivery instructions..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FiCreditCard className="mr-2" />
                  Payment Method
                </h2>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4 mb-6">
                    {/* Cash on Delivery */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={payment.method === 'cod'}
                        onChange={(e) => setPayment({...payment, method: e.target.value})}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                    </label>
                    
                    {/* GCash */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="gcash"
                        checked={payment.method === 'gcash'}
                        onChange={(e) => setPayment({...payment, method: e.target.value})}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">GCash</p>
                        <p className="text-sm text-gray-500">Pay via GCash mobile app</p>
                      </div>
                    </label>
                    
                    {/* Bank Transfer */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={payment.method === 'bank'}
                        onChange={(e) => setPayment({...payment, method: e.target.value})}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-gray-500">BPI, BDO, Metrobank, etc.</p>
                      </div>
                    </label>
                  </div>
                  
                  {payment.method === 'bank' && (
                    <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                      <p className="font-medium mb-2">Bank Account Details:</p>
                      <p className="text-sm">BPI: 1234-5678-90 (Juan Dela Cruz)</p>
                      <p className="text-sm">BDO: 0987-6543-21 (Juan Dela Cruz)</p>
                      <p className="text-sm mt-2">Send screenshot of payment to our Facebook page</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FiPackage className="mr-2" />
                  Order Confirmation
                </h2>
                
                {/* Order Summary */}
                <div className="mb-8">
                  <h3 className="font-bold mb-4">Order Summary</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.cartItemId} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.options && (
                              <div className="text-xs text-gray-500">
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
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold">₱{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div className="mb-8">
                  <h3 className="font-bold mb-2">Shipping to:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-gray-600">{address.phone}</p>
                    <p className="text-gray-600">{address.address}</p>
                    <p className="text-gray-600">{address.city}, {address.province} {address.zipCode}</p>
                    {address.notes && (
                      <p className="text-gray-600 mt-2">Notes: {address.notes}</p>
                    )}
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="font-bold mb-2">Payment Method:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">
                      {payment.method === 'cod' && 'Cash on Delivery'}
                      {payment.method === 'gcash' && 'GCash'}
                      {payment.method === 'bank' && 'Bank Transfer'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="font-bold">₱{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₱{totals.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₱{totals.shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span>₱{totals.tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">₱{totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Order Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  🚚 Estimated delivery: 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;