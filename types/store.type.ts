import { Dispatch } from "react";
import { ProductType } from "./product.type";
import { ProductsType } from "./products.type";

export type StoreContextType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

export type ActionType = {
  type: "CART_ADD_ITEM";
  payload: ProductType;
};

export type StateType = {
  cart: {
    cartItems: ProductsType | [];
  };
};
