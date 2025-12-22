import { 
  products, 
  getProductById, 
  getProductsByCategory, 
  getFeaturedProducts, 
  getFlashSaleProducts,
  getBestSellers,
  searchProducts 
} from '../data/products';

export const productService = {
  // Get all products
  getAllProducts: () => products,
  
  // Get single product by ID
  getProduct: (id) => getProductById(id),
  
  // Get products by category
  getCategoryProducts: (category) => getProductsByCategory(category),
  
  // Get featured products
  getFeatured: () => getFeaturedProducts(),
  
  // Get flash sale products
  getFlashSales: () => getFlashSaleProducts(),
  
  // Get best sellers
  getBestSellers: () => getBestSellers(),
  
  // Search products
  search: (query) => searchProducts(query),
  
  // Get related products (same category)
  getRelatedProducts: (productId) => {
    const product = getProductById(productId);
    if (!product) return [];
    
    return products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, 4);
  },
  
  // Get products by tag
  getProductsByTag: (tag) => {
    return products.filter(product => 
      product.tags.includes(tag.toLowerCase())
    );
  },
  
  // Get all categories
  getCategories: () => {
    const categories = {};
    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = {
          name: product.category,
          count: 1,
          icon: getCategoryIcon(product.category)
        };
      } else {
        categories[product.category].count++;
      }
    });
    return Object.values(categories);
  }
};

// Helper function for category icons
const getCategoryIcon = (category) => {
  const icons = {
    'printing-services': '🎨',
    'electronics': '📱',
    'fashion': '👕',
    'home': '🏠',
    'beauty': '💄',
    'grocery': '🛒',
    'sports': '⚽',
    'books': '📚',
    'toys': '🧸'
  };
  return icons[category] || '📦';
};