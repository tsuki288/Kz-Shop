// src/components/layout/Footer.jsx
import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiHelpCircle, FiShield, FiCreditCard } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">How to Buy</a></li>
              <li><a href="#" className="hover:text-white">Shipping & Delivery</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">About KsShop</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
            <div className="flex flex-wrap gap-2">
              {['Visa', 'MasterCard', 'PayPal', 'UPI', 'NetBanking'].map((method) => (
                <div key={method} className="bg-gray-800 px-3 py-1 rounded">
                  {method}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Download Our App</h3>
            <div className="space-y-3">
              <button className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>Google Play</span>
              </button>
              <button className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center space-x-2">
                <span>🍎</span>
                <span>App Store</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <FiShield size={24} />
              <span>100% Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiHelpCircle size={24} />
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCreditCard size={24} />
              <span>Easy Returns</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <a href="#" className="hover:text-primary"><FiFacebook size={24} /></a>
            <a href="#" className="hover:text-primary"><FiTwitter size={24} /></a>
            <a href="#" className="hover:text-primary"><FiInstagram size={24} /></a>
            <a href="#" className="hover:text-primary"><FiYoutube size={24} /></a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p>© {new Date().getFullYear()} KsShop. All rights reserved.</p>
            <p className="text-sm mt-2">This is a demo Shopee clone built with React & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;