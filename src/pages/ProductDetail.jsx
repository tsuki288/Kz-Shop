import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiTruck, FiShield, FiArrowLeft, FiShare2, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { getProductById } from '../data/products'; // IMPORT FROM YOUR DATA

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Customization states
  const [selectedType, setSelectedType] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [instructionsText, setInstructionsText] = useState('');

  // Design details modal state
  const [showDesignForm, setShowDesignForm] = useState(false);

  // Design form fields
  const [designNotes, setDesignNotes] = useState('');
  const [babyName, setBabyName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [themeTextField, setThemeTextField] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [changeOutfit, setChangeOutfit] = useState('no');
  const [preferredOutfit, setPreferredOutfit] = useState('');

  // Validation errors
  const [designErrors, setDesignErrors] = useState({});

  const validateDesignForm = () => {
    const errs = {};
    if (!deliveryAddress || deliveryAddress.trim().length < 5) {
      errs.deliveryAddress = 'Please provide a complete delivery address.';
    }

    // Require baby name and event date
    if (!babyName || babyName.trim() === '') {
      errs.babyName = 'Please enter a baby name.';
    }
    if (!eventDate) {
      errs.eventDate = 'Please select an event date.';
    }

    setDesignErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const clearFieldError = (field) => {
    if (designErrors[field]) {
      setDesignErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };


  // FETCH PRODUCT FROM YOUR DATA
  useEffect(() => {
    const productData = getProductById(parseInt(id));
    if (productData) {
      setProduct(productData);

      // Initialize customization defaults if available
      if (productData.hasCustomization && productData.customizationOptions) {
        const { type, finish, thickness, themes } = productData.customizationOptions;
        if (type && type.options && type.options.length) setSelectedType(type.options[0].id);
        if (finish && finish.options && finish.options.length) setSelectedFinish(finish.options[0].id);
        if (thickness && thickness.options && thickness.options.length) setSelectedThickness(thickness.options[0].id);
        if (themes && themes.length) setSelectedTheme(themes[0]);
      }

      // Ensure minimum quantity for products that enforce it
      if (productData.minQuantity) {
        setQuantity(productData.minQuantity);
      }

    } else {
      // Product not found
      console.log(`Product with ID ${id} not found`);
    }
    setLoading(false);
  }, [id]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">Product ID: {id} doesn't exist</p>
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

  // Compute options price
  const computeOptionsPrice = () => {
    let extra = 0;
    if (!product || !product.customizationOptions) return 0;

    const { type, finish, thickness } = product.customizationOptions;
    if (type && selectedType) {
      const opt = type.options.find(o => o.id === selectedType);
      if (opt) extra += opt.price || 0;
    }
    if (finish && selectedFinish) {
      const opt = finish.options.find(o => o.id === selectedFinish);
      if (opt) extra += opt.price || 0;
    }
    if (thickness && selectedThickness) {
      const opt = thickness.options.find(o => o.id === selectedThickness);
      if (opt) extra += opt.price || 0;
    }
    return extra;
  };

  const isCustomizationComplete = () => {
    if (!product?.hasCustomization) return true;
    const opts = product.customizationOptions || {};
    if (opts.type?.required && !selectedType) return false;
    if (opts.finish?.required && !selectedFinish) return false;
    if (opts.thickness?.required && !selectedThickness) return false;
    // require theme selection if themes exist (supports themes under customizationOptions)
    const productThemes = product.customizationOptions?.themes || product.themes;
    if (productThemes && productThemes.length && !selectedTheme) return false;
    return true;
  };

  // Helper: derive a friendly display name from a theme image URL
  const getThemeName = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    const fname = parts[parts.length - 1] || url;
    const name = fname.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // HANDLE ADD TO CART WITH REAL PRODUCT DATA
  const handleAddToCart = () => {
    if (!isCustomizationComplete()) {
      alert('Please select all required customization options before adding to cart.');
      return;
    }

    const resolveOption = (group, id) => {
      const opt = group?.options?.find(o => o.id === id);
      return opt ? { id: opt.id, name: opt.name, price: opt.price || 0 } : null;
    };

    const options = {
      type: resolveOption(product.customizationOptions?.type, selectedType),
      finish: resolveOption(product.customizationOptions?.finish, selectedFinish),
      thickness: resolveOption(product.customizationOptions?.thickness, selectedThickness),
      theme: selectedTheme,
      instructions: instructionsText,
    };

    const unitPrice = product.price + computeOptionsPrice();

    // enforce min quantity if defined
    if (product.minQuantity && quantity < product.minQuantity) {
      alert(`Minimum order for this product is ${product.minQuantity} pcs.`);
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: unitPrice,
      image: selectedTheme || product.images?.[0] || 'https://via.placeholder.com/300',
      discount: product.discount,
      options,
      quantity,
    }));

    // Keep Add to Cart silent for UX (no alert)
  };

  // BUY NOW - open design details modal (validate required customization if present)
  const handleBuyNow = () => {
    if (product?.hasCustomization && !isCustomizationComplete()) {
      alert('Please select all required customization options before proceeding.');
      return;
    }

    // If product has minQuantity, ensure quantity meets it
    if (product?.minQuantity && quantity < product.minQuantity) {
      alert(`Minimum order for this product is ${product.minQuantity} pcs.`);
      return;
    }

    setShowDesignForm(true);
  };

 const handleProceedToPayment = () => {
    // Validate form
    if (!deliveryAddress) {
      alert('Please provide a delivery address.');
      return;
    }

    // Build options with form data
    const options = {
      type: product.customizationOptions?.type?.options?.find(o => o.id === selectedType) || null,
      finish: product.customizationOptions?.finish?.options?.find(o => o.id === selectedFinish) || null,
      thickness: product.customizationOptions?.thickness?.options?.find(o => o.id === selectedThickness) || null,
      theme: selectedTheme || product.customizationOptions?.themes?.[0] || product.themes?.[0] || null,
      instructions: instructionsText,
      designNotes,
      babyName,
      eventDate,
      themeTextField,
      deliveryAddress,
      changeOutfit,
      preferredOutfit,
    };

    const unitPrice = product.price + computeOptionsPrice();

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: unitPrice,
      image: options.theme || product.images?.[0],
      discount: product.discount,
      options,
      quantity,
    }));

    setShowDesignForm(false);
    navigate('/checkout');
  };

  // IMAGE NAVIGATION
  const nextImage = () => {
    if (product.images && product.images.length > 1) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 1) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
            >
              <FiArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
              <span className="text-xl font-bold text-orange-500">KsShop</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <FiShare2 size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <FiHeart size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <button onClick={() => navigate('/')} className="hover:text-orange-500">
              Home
            </button>
            <span className="mx-2">›</span>
            <span className="text-gray-800 capitalize">{product.category?.replace('-', ' ') || 'Products'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images (sticky on large screens) */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              {/* Main Image */}
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedTheme || product.images?.[selectedImage] || 'https://via.placeholder.com/600'}
                  alt={product.name}
                  className="w-full h-96 object-contain object-center bg-white p-4"
                  onError={(e) => {
                    const failed = e.target.src;
                    e.target.src = 'https://via.placeholder.com/600';
                    console.error('Main image failed to load:', failed);
                  }}
                />
                
                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </>
                )}
                
                {/* Flash Sale Badge */}
                {product.isFlashSale && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                    FLASH SALE
                  </div>
                )}
              </div>

              {/* Thumbnails: include product images and theme thumbnails if present */}
              {((product.images && product.images.length > 0) || (product.themes && product.themes.length > 0)) && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {(() => {
                    const images = product.images || [];
                    const themes = product.customizationOptions?.themes || product.themes || [];
                    const combined = [...images, ...themes];
                    return combined.map((img, idx) => {
                      const isTheme = idx >= images.length;
                      const thumbKey = `${isTheme ? 'theme' : 'img'}-${idx}`;
                      const isSelected = isTheme ? (selectedTheme === img) : (selectedImage === idx);
                      return (
                        <button
                          key={thumbKey}
                          onClick={() => {
                            if (isTheme) {
                              setSelectedTheme(img);
                              setSelectedImage(0);
                            } else {
                              setSelectedTheme('');
                              setSelectedImage(idx);
                            }
                          }}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${isSelected ? 'border-orange-500' : 'border-gray-200'}`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-contain object-center bg-white p-1"
                            onError={(e) => {
                              const failed = e.target.src;
                              e.target.src = 'https://via.placeholder.com/120';
                              console.error('Thumbnail image failed to load:', failed);
                            }}
                          />
                        </button>
                      );
                    });
                  })()}
                </div>
              )}
            </div>

            {/* Right Column - Product Info (scrollable on large screens) */}
            <div className="lg:max-h-[calc(100vh-5rem)] lg:overflow-auto lg:pr-4">
              {/* Product Name */}
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
              {product.brand && (
                <p className="text-sm text-gray-500 mb-4">Brand: {product.brand}</p>
              )}

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full">
                  <FiStar className="text-orange-500 fill-current" />
                  <span className="ml-1 font-bold">{product.rating || '4.0'}</span>
                </div>
                <span className="text-gray-500">({product.reviews || 0} reviews)</span>
                {product.sold && (
                  <span className="text-green-600 font-medium">● {product.sold.toLocaleString()} sold</span>
                )}
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-3xl font-bold text-orange-500">₱{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">₱{product.originalPrice.toLocaleString()}</span>
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Customization (if applicable) */}
              {product.hasCustomization && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Customize your {product.shortName || product.name}</h3>

                  {/* Type Selection */}
                  {product.customizationOptions?.type && (
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">{product.customizationOptions.type.title}</p>
                      <div className="flex items-center space-x-3 flex-wrap">
                        {product.customizationOptions.type.options.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedType(opt.id)}
                            className={`px-3 py-2 rounded-lg border ${selectedType === opt.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} text-sm`}
                          >
                            {opt.name}{opt.price ? ` (+₱${opt.price})` : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Finish Selection */}
                  {product.customizationOptions?.finish && (
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">{product.customizationOptions.finish.title}</p>
                      <div className="flex items-center space-x-3 flex-wrap">
                        {product.customizationOptions.finish.options.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedFinish(opt.id)}
                            className={`px-3 py-2 rounded-lg border ${selectedFinish === opt.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} text-sm`}
                          >
                            {opt.name}{opt.price ? ` (+₱${opt.price})` : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Thickness Selection */}
                  {product.customizationOptions?.thickness && (
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">{product.customizationOptions.thickness.title}</p>
                      <div className="flex items-center space-x-3 flex-wrap">
                        {product.customizationOptions.thickness.options.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedThickness(opt.id)}
                            className={`px-3 py-2 rounded-lg border ${selectedThickness === opt.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} text-sm`}
                          >
                            {opt.name}{opt.price ? ` (+₱${opt.price})` : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Theme Selection: show names and make selection clear */}
                  {((product.customizationOptions?.themes) || product.themes) && ((product.customizationOptions?.themes) || product.themes).length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">
                        Choose a theme
                        {selectedTheme && (
                          <span className="text-sm text-gray-500 ml-2">— Selected: <span className="font-medium">{getThemeName(selectedTheme)}</span></span>
                        )}
                      </p>

                      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                        {((product.customizationOptions?.themes) || product.themes).map((theme, idx) => {
                          const isSelected = selectedTheme === theme;
                          return (
                            <button
                              key={idx}
                              onClick={() => { setSelectedTheme(theme); setSelectedImage(0); }}
                              className={`flex flex-col items-center flex-shrink-0 w-20`}
                              aria-pressed={isSelected}
                            >
                              <div className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${isSelected ? 'border-orange-500' : 'border-gray-200'}`}>
                                <img
                                  src={theme}
                                  alt={`Theme ${idx+1}`}
                                  className="w-full h-full object-contain object-center bg-white p-1"
                                  onError={(e) => { const failed = e.target.src; e.target.src = 'https://via.placeholder.com/120'; console.error('Theme failed to load:', failed); }}
                                />
                              </div>
                              <div className="text-xs text-center mt-1">{getThemeName(theme)}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}



                  {/* Instructions */}
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-2">{product.customizationOptions?.instructions?.title || 'Instructions'}</p>
                    <textarea
                      rows={3}
                      value={instructionsText}
                      onChange={(e) => setInstructionsText(e.target.value)}
                      placeholder={product.customizationOptions?.instructions?.placeholder || ''}
                      className="w-full border rounded-lg p-2 text-sm"
                    />
                  </div>

                  {/* Price note */}
                  <div className="text-sm text-gray-600 mt-2">
                    Unit price: <span className="font-bold text-orange-500">₱{(product.price + computeOptionsPrice()).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="font-medium mb-2">Quantity</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(product?.minQuantity || 1, prev - 1))}
                      disabled={quantity <= (product?.minQuantity || 1)}
                      className={`px-4 py-2 hover:bg-gray-100 ${quantity <= (product?.minQuantity || 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x w-16 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-500">
                    {product.stock ? `${product.stock} items in stock` : 'Available'}
                  </span>
                </div>
                {product.minQuantity && (
                  <p className="text-xs text-gray-500 mt-2">Minimum order: {product.minQuantity} pcs</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center space-x-2 bg-white text-orange-500 border-2 border-orange-500 py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors"
                >
                  <FiShoppingCart size={20} />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                >
                  BUY NOW
                </button>
              </div>

              {/* Design Details Modal */}
              {showDesignForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                  <div className="bg-white rounded-lg w-full max-w-xl p-6 overflow-auto max-h-[90vh]">
                    <h3 className="text-lg font-bold mb-3">Design Details</h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Input Details you want</label>
                        <textarea value={designNotes} onChange={(e)=>setDesignNotes(e.target.value)} rows={3} className="w-full border rounded p-2" placeholder="Write details (e.g., Birthday text, names, theme)"></textarea>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Baby Name</label>
                        <input
                          value={babyName}
                          onChange={(e)=>{ setBabyName(e.target.value); clearFieldError('babyName'); }}
                          className={`w-full border rounded p-2 ${designErrors.babyName ? 'border-red-500' : ''}`}
                          placeholder="e.g., Kazeem"
                        />
                        {designErrors.babyName && <p className="text-xs text-red-600 mt-1">{designErrors.babyName}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium">Event Date</label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e)=>{ setEventDate(e.target.value); clearFieldError('eventDate'); }}
                          className={`w-full border rounded p-2 ${designErrors.eventDate ? 'border-red-500' : ''}`}
                        />
                        {designErrors.eventDate && <p className="text-xs text-red-600 mt-1">{designErrors.eventDate}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium">Your Theme (optional)</label>
                        <input value={themeTextField} onChange={(e)=>setThemeTextField(e.target.value)} className="w-full border rounded p-2" />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Complete Address (for delivery)</label>
                        <textarea
                          value={deliveryAddress}
                          onChange={(e)=>{ setDeliveryAddress(e.target.value); clearFieldError('deliveryAddress'); }}
                          rows={3}
                          className={`w-full border rounded p-2 ${designErrors.deliveryAddress ? 'border-red-500' : ''}`}
                          placeholder="House No., Street, Barangay, City, Province"
                        />
                        {designErrors.deliveryAddress && <p className="text-xs text-red-600 mt-1">{designErrors.deliveryAddress}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium">Do you want to change the outfit?</label>
                        <select
                          value={changeOutfit}
                          onChange={(e) => {
                            const v = e.target.value;
                            setChangeOutfit(v);
                            if (v !== 'yes') setPreferredOutfit(''); // clear selection when not changing outfit
                          }}
                          className="w-full border rounded p-2"
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes (FREE 1 change)</option>
                        </select>
                      </div>

                      {changeOutfit === 'yes' && (
                        <div>
                          <label className="text-sm font-medium">Preferred Outfit (optional)</label>
                          <select value={preferredOutfit} onChange={(e)=>setPreferredOutfit(e.target.value)} className="w-full border rounded p-2">
                            <option value="">Select outfit type</option>
                            <option value="teddy">Teddy</option>
                            <option value="prince">Prince</option>
                            <option value="police">Police</option>
                            <option value="custom">Custom (message on Messenger)</option>
                          </select>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <button onClick={()=>setShowDesignForm(false)} className="bg-white border px-4 py-2 rounded">Back</button>
                        <button
                          onClick={() => handleProceedToPayment()}
                          disabled={!deliveryAddress || !babyName || !eventDate}
                          className={`px-4 py-2 rounded text-white ${(!deliveryAddress || !babyName || !eventDate) ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                          Proceed to Payment
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Shipping & Warranty */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <FiTruck className="text-green-500" size={24} />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-gray-500">Above ₱499</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiShield className="text-blue-500" size={24} />
                  <div>
                    <p className="font-medium">Warranty</p>
                    <p className="text-sm text-gray-500">{product.warranty || 'Quality Guaranteed'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-3 text-gray-600 font-medium w-1/3">{key}</td>
                        <td className="py-3">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;