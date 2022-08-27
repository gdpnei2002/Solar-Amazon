import { createContext, ReactNode, useState } from "react";
import { Coffee } from "../pages/Home/components/ProdCard";
import {produce} from "immer";

export interface CartItem extends Coffee{
    quantity: number;
}

interface CartContextType{
    cartItems: CartItem[];
    addProdtoCart: (coffee: CartItem) => void
}

interface CartContextProviderProps{
    children: ReactNode
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps){
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function addProdtoCart(coffee: CartItem){
        const coffeeAlreadyExistInCart = cartItems.findIndex(
            (cartItems) => cartItems.id === coffee.id
        )

        const newCart = produce(cartItems,(draft) =>{
            if (coffeeAlreadyExistInCart < 0){
                draft.push(coffee);
            } else {
                draft[coffeeAlreadyExistInCart].quantity += coffee.quantity
            }
        })

        setCartItems(newCart)
    }

    console.log(cartItems)
    return(
        <CartContext.Provider value={{ cartItems, addProdtoCart }}>
            {children}
        </CartContext.Provider>
    )
}