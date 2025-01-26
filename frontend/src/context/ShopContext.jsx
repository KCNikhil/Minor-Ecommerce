import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  // Initialize cartItems from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    const cartData = { ...cartItems };

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
    toast.success("Item added to cart!");
  };

  const removeFromCart = (itemId, size) => {
    const cartData = { ...cartItems };

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] -= 1;

      if (cartData[itemId][size] === 0) {
        delete cartData[itemId][size];
      }

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);
      toast.success("Item removed from cart!");
    }
  };

  const clearCart = () => {
    setCartItems({});
    toast.success("Cart cleared!");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          totalCount += cartItems[itemId][size];
        } catch (error) {
          console.error("Error calculating cart count:", error);
        }
      }
    }
    return totalCount;
  };

  const getCartTotal = () => {
    let totalPrice = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          totalPrice += cartItems[itemId][size] * product.price;
        }
      }
    }
    return totalPrice + delivery_fee;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product)=> product._id === items);
      for(const item in cartItems[items]){
        try{
          if (cartItems[items][item]>0){
            totalAmount += itemInfo.price * cartItems[items][item]

          }
        } catch (error){

        }
      }
    }
    return totalAmount;
  }

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
    updateQuantity,
    getCartAmount,
    navigate
    
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
