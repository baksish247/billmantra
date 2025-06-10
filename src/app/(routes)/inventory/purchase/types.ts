export type Seller = {
  name: string;
  email: string;
  phone: string;
  seller_id?: string;
};

export type ExistingItem = {
  product_name: string;
    product_id?: string;
  purchase_qty: number;
  purchase_price_per_unit: number;

};

export type NewItem = {
  name: string;
  image_url: string;
  category: string;
  available_unit: number;
  minimum_threshold: number;
  measurement_unit: string;
  unit_price: number;
  unit_qty: number;
  is_variable_qty: boolean;
  is_available: boolean;
  purchase_qty?: number;
  purchase_price_per_unit?: number;
};

export interface ProductType {
  _id: string;
  name: string;
  image_url: string;
  category: string;
  available_unit: number;
  measurement_unit: string;
  unit_price: number;
  unit_qty: number;
  is_variable_qty: boolean;
  is_available: boolean;
  shop_id: string;
  seller_ids: string[];
  purchase_ids: string[];
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  minimum_threshold: number;
}