// src/data/products.js
export const products = [
  // ============ CUSTOM REF MAGNETS (YOUR FEATURED PRODUCT) ============
  {
  id: 1001,
  name: 'Custom Ref Magnet Printing',
  shortName: 'Custom Ref Magnets',
  description: 'Personalized ref magnets, perfect for souvenirs or giveaways.',
  price: 18,
  originalPrice: 30,
  discount: 40,
  rating: 4.8,
  reviews: 234,
  isFlashSale: true,
  isFeatured: true,
  isBestSeller: true,
  category: 'printing-services',
  subCategory: 'magnets',
  tags: ['custom', 'personalized', 'gifts', 'souvenirs', 'magnets', 'printing'],
  brand: 'PrintPro',
  warranty: 'Quality Guarantee',
  stock: 150,
  sold: 1250,
  images: [
    '/service/refmagnet/refmagnet.webp',
  ],
  features: [
    'Starting at ₱18 (auto-cut)',
    'Various shapes and sizes',
    'Durable and vibrant prints',
    'Face-cut, number-cut & ATM size available',
    'Custom designs accepted',
    'Bulk order discounts',
    'Fast 3-5 day turnaround'
  ],
  specifications: {
    'Material': 'High-grade magnet with glossy finish',
    'Sizes Available': 'ATM, Card, Square, Custom shapes',
    'Print Type': 'Full-color digital print',
    'Minimum Order': '10 pieces',
    'Production Time': '3-5 business days'
  },
  // Customization options (kept from your earlier addition)
  hasCustomization: true,
  minQuantity: 25,
  maxQuantity: 500,
  customizationOptions: {
    type: {
      title: 'Cut Type',
      required: true,
      options: [
        { id: 'auto-cut', name: 'Auto Cut Face', description: 'Automatically cut around the face', price: 0, image: '/service/auto-cut.jpg' },
        { id: 'auto-cut-number', name: 'Auto Cut with Number', description: 'Auto cut with number included', price: 24, image: '/service/auto-cut-number.jpg' },
        { id: 'atm-size', name: 'ATM Size', description: 'Standard ATM card size', price: 0, image: '/service/atm-size.jpg' }
      ]
    },
    finish: {
      title: 'Finish Type',
      required: true,
      options: [
        { id: 'matte', name: 'Matte Finish', description: 'Non-reflective matte surface', price: 0, image: '/service/matte.jpg' },
        { id: 'glossy', name: 'Glossy Finish', description: 'Shiny glossy surface', price: 5, image: '/service/glossy.jpg' },
        { id: 'glitter', name: 'Glitter Finish', description: 'Sparkling glitter effect', price: 10, image: '/service/glitter.jpg' }
      ]
    },
    thickness: {
      title: 'Thickness',
      required: true,
      options: [
        { id: '0.5mm', name: '0.5mm Thin', description: 'Standard thickness', price: 0, image: '/service/thin.jpg' },
        { id: '1mm', name: '1mm Thick', description: 'Premium thick magnet', price: 15, image: '/service/thick.jpg' }
      ]
    },
    design: {
      title: 'Upload Design',
      required: true,
      description: 'Upload your design file (JPG, PNG, PDF)',
      accept: 'image/*,.pdf'
    },
    instructions: {
      title: 'Special Instructions',
      required: false,
      placeholder: 'Any special requests or instructions...'
    },
    // Theme gallery (pre-saved images in public/service/refmagnet)
    themes: [
      '/service/refmagnet/Balloon-bear.jpg',
      '/service/refmagnet/Safari-Pink.jpg',
      '/service/refmagnet/baby-shark-face.jpg',
      '/service/refmagnet/baby-shark.jpg',
      '/service/refmagnet/blippi.jpg',
      '/service/refmagnet/boho-theme.jpg',
      '/service/refmagnet/butterfly.jpg',
      '/service/refmagnet/candyland.jpg',
      '/service/refmagnet/cocomelon.jpg',
      '/service/refmagnet/dinasour.jpg',
      '/service/refmagnet/disney-princss.jpg',
      '/service/refmagnet/lucas-and-friends.jpg',
      '/service/refmagnet/police.jpg',
      '/service/refmagnet/prince.jpg',
      '/service/refmagnet/racing-car.jpg',
      '/service/refmagnet/refmagnet.webp',
      '/service/refmagnet/roblox.jpg',
      '/service/refmagnet/royal-prince.jpg',
      '/service/refmagnet/safari.jpg',
      '/service/refmagnet/sesame-street.jpg',
      '/service/refmagnet/spiderman.jpg',
      '/service/refmagnet/super-mario.jpg',
      '/service/refmagnet/wedding-atm.png'
    ]
  }
},

  // ============ PERSONALIZED MUG PRINTING ============
  {
    id: 1002,
    name: 'Personalized Mug Printing',
    shortName: 'Custom Mugs',
    description: 'Create unique mugs with your photos, logos, or custom messages.',
    price: 89,
    originalPrice: 120,
    discount: 26,
    rating: 4.7,
    reviews: 189,
    isFlashSale: true,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'mugs',
    tags: ['mug', 'personalized', 'gift', 'sublimation'],
    brand: 'PrintPro',
    warranty: '6 Months',
    stock: 200,
    sold: 890,
    images: [
      '/service/customizedmug.webp',
    ],
    features: [
      'Only ₱89 (with box, sticker, and ribbon)',
      'Sublimation Printing',
      'Full-color designs',
      'High-quality ceramic',
      'Dishwasher safe'
    ]
  },

  // ============ NORDIC MUG ============
  {
    id: 1003,
    name: 'Nordic Mug',
    shortName: 'Nordic Mug',
    description: 'Stylish Nordic mugs, perfect for a modern touch to your personalized collection.',
    price: 249,
    originalPrice: 350,
    discount: 29,
    rating: 4.6,
    reviews: 95,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'mugs',
    tags: ['mug', 'nordic', 'premium', 'ceramic'],
    brand: 'PrintPro',
    warranty: '1 Year',
    stock: 80,
    sold: 320,
    images: [
      '/service/nordicmug.webp',
    ],
    features: [
      'Only ₱249',
      'Premium ceramic material',
      'Unique Nordic design',
      'Large capacity',
      'Modern aesthetic'
    ]
  },

  // ============ CUSTOMIZED TUMBLER ============
  {
    id: 1004,
    name: 'Customized Tumbler',
    shortName: 'Custom Tumbler',
    description: 'Personalized tumblers for your daily hydration or as unique gifts.',
    price: 589,
    originalPrice: 799,
    discount: 26,
    rating: 4.8,
    reviews: 156,
    isFlashSale: true,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'tumblers',
    tags: ['tumbler', 'personalized', 'hydration', 'gift'],
    brand: 'PrintPro',
    warranty: '1 Year',
    stock: 120,
    sold: 450,
    images: [
      '/service/tumbler.webp',
    ],
    features: [
      'Only ₱589',
      'High-quality insulation',
      'Durable and portable',
      'Leak-proof lid',
      'Custom full-wrap printing'
    ]
  },

  // ============ GLASS CUP ============
  {
    id: 1005,
    name: 'Glass Cup',
    shortName: 'Glass Cup',
    description: 'Elegant glass cups for a sophisticated drinking experience.',
    price: 105,
    originalPrice: 150,
    discount: 30,
    rating: 4.5,
    reviews: 78,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'glassware',
    tags: ['glass', 'cup', 'elegant', 'drinkware'],
    brand: 'PrintPro',
    warranty: '6 Months',
    stock: 150,
    sold: 210,
    images: [
      '/service/glass-cup.webp',
    ],
    features: [
      'Only ₱105',
      'Clear and durable glass',
      'Perfect for any beverage',
      'Elegant design',
      'Easy to clean'
    ]
  },

  // ============ INNER MUG ============
  {
    id: 1006,
    name: 'Inner Mug',
    shortName: 'Inner Mug',
    description: 'Mugs with a colored inner lining for a subtle pop of color.',
    price: 119,
    originalPrice: 170,
    discount: 30,
    rating: 4.4,
    reviews: 62,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'mugs',
    tags: ['mug', 'inner-color', 'unique', 'ceramic'],
    brand: 'PrintPro',
    warranty: '6 Months',
    stock: 100,
    sold: 180,
    images: [
      '/service/innermug.webp',
    ],
    features: [
      'Only ₱119',
      'Various inner colors available',
      'Customizable exterior',
      'High-quality ceramic',
      'Microwave safe'
    ]
  },

  // ============ MAGIC MUG ============
  {
    id: 1007,
    name: 'Magic Mug',
    shortName: 'Magic Mug',
    description: 'Reveal your hidden design when hot liquid is poured into this magical mug!',
    price: 129,
    originalPrice: 180,
    discount: 28,
    rating: 4.9,
    reviews: 203,
    isFlashSale: true,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'mugs',
    tags: ['mug', 'magic', 'surprise', 'heat-sensitive'],
    brand: 'PrintPro',
    warranty: '6 Months',
    stock: 90,
    sold: 520,
    images: [
      '/service/magicmug.webp',
    ],
    features: [
      'Only ₱129',
      'Heat-sensitive coating',
      'Surprise and delight effect',
      'High-quality ceramic',
      'Fun gift idea'
    ]
  },

  // ============ VINYL STICKER (PER INCH) ============
  {
    id: 1008,
    name: 'Vinyl Sticker (Per Inch)',
    shortName: 'Vinyl Stickers',
    description: 'Durable vinyl stickers, perfect for tumblers, motors, or any outdoor use.',
    price: 5,
    originalPrice: 8,
    discount: 38,
    rating: 4.7,
    reviews: 145,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'stickers',
    tags: ['sticker', 'vinyl', 'durable', 'outdoor'],
    brand: 'PrintPro',
    warranty: '1 Year Outdoor',
    stock: 1000,
    sold: 2500,
    images: [
      '/service/vinylsticker.webp',
    ],
    features: [
      'Only ₱5 per inch',
      'Weatherproof and long-lasting',
      'Custom shapes and sizes',
      'UV resistant',
      'Waterproof adhesive'
    ]
  },

  // ============ CUSTOMIZED NOTEBOOK (60 PAGES) ============
  {
    id: 1009,
    name: 'Customized Notebook (60 pages)',
    shortName: 'Custom Notebook',
    description: 'Personalized notebooks for school, office, or as thoughtful gifts.',
    price: 89,
    originalPrice: 120,
    discount: 26,
    rating: 4.6,
    reviews: 98,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'stationery',
    tags: ['notebook', 'custom', 'stationery', 'gift'],
    brand: 'PrintPro',
    warranty: 'N/A',
    stock: 300,
    sold: 420,
    images: [
      '/service/notebook.webp',
    ],
    features: [
      'Only ₱89',
      '60 pages',
      'Custom cover design',
      'High-quality paper',
      'Spiral bound'
    ]
  },

  // ============ T-SHIRT PRINTING (STANDARD) ============
  {
    id: 1010,
    name: 'T-Shirt Printing (Standard)',
    shortName: 'Standard T-Shirt',
    description: 'Express yourself with custom-designed t-shirts for events, businesses, or personal wear.',
    price: 99,
    originalPrice: 150,
    discount: 34,
    rating: 4.5,
    reviews: 210,
    isFlashSale: true,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'apparel',
    tags: ['t-shirt', 'printing', 'custom', 'apparel'],
    brand: 'PrintPro',
    warranty: 'Wash Guarantee',
    stock: 500,
    sold: 1200,
    images: [
      '/service/tshirt.webp',
    ],
    features: [
      'Starting at ₱99',
      'Various printing methods',
      'Comfortable standard fabric',
      'Multiple colors available',
      'Bulk discounts'
    ]
  },

  // ============ PREMIUM T-SHIRT PRINTING ============
  {
    id: 1011,
    name: 'Premium T-Shirt Printing',
    shortName: 'Premium T-Shirt',
    description: 'High-quality t-shirts with premium fabric and printing for a superior feel and look.',
    price: 300,
    originalPrice: 450,
    discount: 33,
    rating: 4.8,
    reviews: 156,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'apparel',
    tags: ['t-shirt', 'premium', 'quality', 'apparel'],
    brand: 'PrintPro',
    warranty: 'Wash Guarantee',
    stock: 300,
    sold: 680,
    images: [
      '/service/premium-tshirt.jfif',
    ],
    features: [
      'Starting at ₱300',
      'Soft and durable materials',
      'Vibrant and long-lasting prints',
      'Premium cotton blend',
      'Professional finish'
    ]
  },

  // ============ CUSTOM TOTE BAGS ============
  {
    id: 1012,
    name: 'Custom Tote Bags',
    shortName: 'Tote Bags',
    description: 'Eco-friendly and stylish tote bags with your custom designs.',
    price: 65,
    originalPrice: 95,
    discount: 32,
    rating: 4.7,
    reviews: 134,
    isFlashSale: true,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'bags',
    tags: ['tote-bag', 'eco-friendly', 'custom', 'bag'],
    brand: 'PrintPro',
    warranty: '6 Months',
    stock: 400,
    sold: 890,
    images: [
      '/service/totebag.webp',
    ],
    features: [
      'Starting at ₱65',
      'Durable fabric',
      'Perfect for branding or personal use',
      'Reusable and eco-friendly',
      'Large capacity'
    ]
  },

  // ============ CUSTOMIZED LOOT BOX (10 PCS) ============
  {
    id: 1013,
    name: 'Customized Loot Box (10 pcs)',
    shortName: 'Loot Box',
    description: 'Personalized loot boxes for parties, events, or special occasions.',
    price: 180,
    originalPrice: 250,
    discount: 28,
    rating: 4.6,
    reviews: 89,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'packaging',
    tags: ['loot-box', 'party', 'custom', 'packaging'],
    brand: 'PrintPro',
    warranty: 'N/A',
    stock: 200,
    sold: 310,
    images: [
      '/service/customized-loot-box.webp',
    ],
    features: [
      'Only ₱180 (for 10 pieces)',
      'Custom themes and designs',
      'Perfect for party favors',
      'Various sizes available',
      'Quick turnaround'
    ]
  },

  // ============ BAPTISM CANDLE ============
  {
    id: 1014,
    name: 'Baptism Candle',
    shortName: 'Baptism Candle',
    description: 'Beautifully customized candles for baptisms and other religious events.',
    price: 20,
    originalPrice: 30,
    discount: 33,
    rating: 4.8,
    reviews: 120,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'religious',
    tags: ['candle', 'baptism', 'religious', 'custom'],
    brand: 'PrintPro',
    warranty: 'N/A',
    stock: 300,
    sold: 520,
    images: [
      '/service/baptismcandle.webp',
    ],
    features: [
      'Starting at ₱20 each',
      'Personalized designs',
      'High-quality wax',
      'Clean burn',
      'Elegant packaging'
    ]
  },

  // ============ CUSTOMIZED EVENT HAT ============
  {
    id: 1015,
    name: 'Customized Event Hat',
    shortName: 'Event Hat',
    description: 'Personalized hats for events, promotions, or team wear.',
    price: 105,
    originalPrice: 150,
    discount: 30,
    rating: 4.5,
    reviews: 78,
    isFlashSale: true,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'apparel',
    tags: ['hat', 'event', 'custom', 'cap'],
    brand: 'PrintPro',
    warranty: '6 Months',
    stock: 250,
    sold: 420,
    images: [
      '/service/event-hat.webp',
    ],
    features: [
      'Only ₱105 each',
      'Various colors and styles',
      'Custom embroidery or print',
      'Adjustable size',
      'Durable material'
    ]
  },

  // ============ CUSTOMIZED CHIP BAG (SMALL) ============
  {
    id: 1016,
    name: 'Customized Chip Bag (Small)',
    shortName: 'Small Chip Bag',
    description: 'Personalized small chip bags for party favors or snacks.',
    price: 10,
    originalPrice: 15,
    discount: 33,
    rating: 4.7,
    reviews: 95,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'packaging',
    tags: ['chip-bag', 'party', 'snack', 'custom'],
    brand: 'PrintPro',
    warranty: 'N/A',
    stock: 1000,
    sold: 2300,
    images: [
      '/service/chipbagsmall.webp',
    ],
    features: [
      'Only ₱10',
      'Custom designs',
      'Perfect for small treats',
      'Food-safe material',
      'Quick production'
    ]
  },

  // ============ CUSTOMIZED CHIP BAG (BIG) ============
  {
    id: 1017,
    name: 'Customized Chip Bag (Big)',
    shortName: 'Big Chip Bag',
    description: 'Larger personalized chip bags for events and gatherings.',
    price: 16,
    originalPrice: 25,
    discount: 36,
    rating: 4.6,
    reviews: 82,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'packaging',
    tags: ['chip-bag', 'large', 'party', 'snack'],
    brand: 'PrintPro',
    warranty: 'N/A',
    stock: 800,
    sold: 1500,
    images: [
      '/service/chipbagsmall.webp',
    ],
    features: [
      'Only ₱16',
      'Custom designs',
      'More space for goodies',
      'Food-safe material',
      'Sturdy construction'
    ]
  },

  // ============ PHOTO PRINTING (A4 SIZE) ============
  {
    id: 1018,
    name: 'Photo Printing (A4 Size)',
    shortName: 'A4 Photo Print',
    description: 'High-quality photo printing on A4 size paper.',
    price: 45,
    originalPrice: 65,
    discount: 31,
    rating: 4.8,
    reviews: 167,
    isFlashSale: true,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'photo',
    tags: ['photo', 'printing', 'a4', 'quality'],
    brand: 'PrintPro',
    warranty: 'N/A',
    stock: 500,
    sold: 1200,
    images: [
      '/service/photoprinting.webp',
    ],
    features: [
      'Only ₱45',
      'Vibrant colors',
      'Professional finish',
      'High-resolution printing',
      'Glossy or matte finish'
    ]
  },

  // ============ STICKER (A4 SIZE VINYL) ============
  {
    id: 1019,
    name: 'Sticker (A4 Size Vinyl)',
    shortName: 'A4 Vinyl Sticker',
    description: 'Custom vinyl stickers on A4 size sheets, durable for outdoor use.',
    price: 45,
    originalPrice: 65,
    discount: 31,
    rating: 4.7,
    reviews: 142,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'stickers',
    tags: ['sticker', 'vinyl', 'a4', 'durable'],
    brand: 'PrintPro',
    warranty: '1 Year Outdoor',
    stock: 600,
    sold: 980,
    images: [
      '/service/stickera4.webp',
    ],
    features: [
      'Only ₱45',
      'Waterproof and long-lasting',
      'Customizable designs',
      'UV resistant',
      'Easy application'
    ]
  },

  // ============ ID LACE PRINTING ============
  {
    id: 1020,
    name: 'ID Lace Printing',
    shortName: 'ID Lace',
    description: 'Customized ID laces for corporate events, schools, and organizations. Professional and durable.',
    price: 35,
    originalPrice: 50,
    discount: 30,
    rating: 4.6,
    reviews: 89,
    isFlashSale: false,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'accessories',
    tags: ['id-lace', 'corporate', 'school', 'accessory'],
    brand: 'PrintPro',
    warranty: '6 Months',
    stock: 400,
    sold: 650,
    images: [
      '/service/idlaceprinting.webp',
    ],
    features: [
      'Full-color printing',
      'Various widths available',
      'With or without accessories',
      'Durable material',
      'Custom designs'
    ]
  },

  // ============ BUTTON PIN PRINTING ============
  {
    id: 1021,
    name: 'Button Pin Printing',
    shortName: 'Button Pins',
    description: 'Fun and customizable button pins for souvenirs, campaigns, or personal flair.',
    price: 25,
    originalPrice: 35,
    discount: 29,
    rating: 4.8,
    reviews: 203,
    isFlashSale: true,
    isFeatured: false,
    category: 'printing-services',
    subCategory: 'accessories',
    tags: ['button-pin', 'souvenir', 'custom', 'pin'],
    brand: 'PrintPro',
    warranty: 'N/A',
    stock: 800,
    sold: 1500,
    images: [
      '/service/buttonpin.webp',
    ],
    features: [
      'Various sizes available',
      'Glossy finish',
      'Quick turnaround',
      'Custom designs',
      'Metal clutch back'
    ]
  }
];

// Helper functions
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

export const getFlashSaleProducts = () => {
  return products.filter(product => product.isFlashSale);
};

export const getBestSellers = () => {
  return products.slice().sort((a, b) => b.sold - a.sold).slice(0, 10);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};