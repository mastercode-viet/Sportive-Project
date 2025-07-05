import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  isUserAuthenticated: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem('cart');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Listen for storage changes to clear cart when user logs out
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'refine-auth' && !e.newValue) {
        // User logged out, clear cart
        setItems([]);
        localStorage.removeItem('cart');
      }
    };

    const handleUserLogout = () => {
      // User logged out, clear cart
      setItems([]);
      localStorage.removeItem('cart');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogout', handleUserLogout);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);

  const addToCart = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      
      return [...currentItems, newItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((currentItems) => {
      if (quantity === 0) {
        return currentItems.filter((item) => item.id !== itemId);
      }
      
      return currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const isUserAuthenticated = () => {
    const userStr = localStorage.getItem('refine-auth');
    return userStr ? true : false;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        isUserAuthenticated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
