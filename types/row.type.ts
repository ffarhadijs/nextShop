export type orderRowType = {
  shippingAddress: {
    name: string;
    country: string;
    city: string;
    lastName: string;
    address: string;
  };
  image: string;
  quantity: number;
  customer: string;
  address: string;
  paidAt: string;
  name: string;
  total: number;
  unitPrice: number;
  createdAt: string;
  price: number;
};

export type productRowType = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  isAdmin: boolean;
  address: string;
  country: string;
  city: string;
  lastName: string;
};
