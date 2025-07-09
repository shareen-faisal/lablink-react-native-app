import { createContext, useState,useEffect } from 'react';

export const CartContext = createContext()


export default function CartProvider({children }) {
    const [cart,setCart] = useState([]);
    const [total,setTotal] = useState(0)
    const [subTotal,setSubTotal] = useState(0);

    
    const addToCart=(item)=>{
        setCart((p)=>{
            const isPressent = p.findIndex((temp)=>(temp.name===item.name && temp.date.getDate()===item.date.getDate() && temp.date.getMonth()===item.date.getMonth() && temp.time===item.time));
            if(isPressent!==-1){
                const updated = [...p];
                updated[isPressent]={...updated[isPressent], quantity: updated[isPressent].quantity+item.quantity};
                return updated;
            }else{

                return [...p,{...item}]

            }
        })
    }

    const removeFromCart = (id, date, time) => {
        setCart((prevCart) =>
          prevCart.filter(
            (item) => !(item.id === id && item.date === date && item.time === time)
          )
        );
      };

      const clearCart = ()=>{
        setCart([]);
      }

      
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

    useEffect(() => {
    const newSubTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharges = cart.length > 0 ? 150 : 0;
    setSubTotal(newSubTotal);
    setTotal(newSubTotal + deliveryCharges);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems,clearCart,total,subTotal }}>
    {children}
  </CartContext.Provider>
    
  )
}