import { createContext, useReducer } from "react";
import { ProductType } from "../types/product.type";
import { ActionType, StateType, StoreContextType } from "../types/store.type";

export const Store = createContext({} as StoreContextType);

const initilState = {
  cart: {
    cartItems: [],
  },
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: ProductType) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: ProductType) =>
            item.slug === existItem.slug ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initilState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
