import { createContext, useState } from 'react';

export const CartContext = createContext()


export default function CartProvider({children }) {
    const [cart,setCart] = useState([]);
    
    const addToCart=(item)=>{
        setCart((p)=>{
            const isPressent = p.findIndex((temp)=>(temp.id===item.id && temp.date===item.date && temp.time===item.time));

            if(isPressent!==-1){
                const updated = [...p];
                updated[isPressent].quantity+=1;
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

      
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems }}>
    {children}
  </CartContext.Provider>
    
  )
}
