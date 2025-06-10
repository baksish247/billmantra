export interface Product {
    _id: string;
    name: string;
    category: string;
    available_unit: number;
    measurement_unit: string;
    unit_price: number;
    unit_qty: number;
    is_available: boolean;
    is_variable_qty: boolean;
    image_url?: string; // optional, not used in cart but part of full product
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  

  export interface Customer {
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_id: string;
}

export interface Item {
    display_name: string;
    product_id: string;
    qty: number;
    unit_price: number;
    total_price: number;
    measurement_unit: string;
}

export interface Payload {
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_id: string;
    bill_origin: string;
    shop_id: string;
    payment_mode?: string; // optional
    payment_status?: string; // optional
    order_type: string;
    items: Item[];
}
