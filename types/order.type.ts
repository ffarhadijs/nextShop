import { OrderItemType } from "./orderItem.type";

export type OrderType = {
  createdAt: string;
  itemsPrice: number;
  orderItems: OrderItemType[];
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    lastName: string;
    name: string;
  };
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  updatedAt: string;
  user: string;
  _id: string;
  __v: number;

};
