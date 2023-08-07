import { createContext, useReducer } from "react";
import { ProductType } from "../types/product.type";
import { ActionType, StateType, StoreContextType } from "../types/store.type";

export const Store = createContext({} as StoreContextType);

const initilState = {
  cart: {
    cartItems: [],
  },
  wishList: {
    withListItems: [],
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
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "WISHLIST_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.wishList.withListItems.find(
        (item: ProductType) => item._id === newItem._id
      );

      if (existItem) {
        const withListItems = state.wishList.withListItems.filter(
          (item) => item._id !== newItem._id
        );
        return {
          ...state,
          wishList: {
            ...state.wishList,
            withListItems,
          },
        };
      } else {
        return {
          ...state,
          wishList: {
            ...state.wishList,
            withListItems: [...state.wishList.withListItems, newItem],
          },
        };
      }
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
