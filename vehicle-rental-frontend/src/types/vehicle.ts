export interface Vehicle {
  _id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  averageRating?: number;
  provider: {
    _id: string;
    name: string;
    address: string;
    city: string;
    mobile: string
  };
}
