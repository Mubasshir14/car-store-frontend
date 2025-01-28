export type TProducts = {
  [x: string]: any;
  _id: string;
  image?: string;
  brand: string;
  carName: string;
  model: string;
  year: number;
  price: number;
  category: "Sedan" | "SUV" | "Truck" | "Coupe" | "Convertible";
  description: string;
  quantity: number;
  milage: string;
  fuelType: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TApiResponse = {
  data: TProducts[];
  meta?: {
    total: number;
    page: number;
  };
};