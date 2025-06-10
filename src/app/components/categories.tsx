import {
  Package,
  ShoppingCart,
  Coffee,
  Cookie,
  IceCream,
  Fish,
  Drumstick,
  Apple,
  Leaf,
  Baby,
  LifeBuoy,
  Home,
  Droplet,
  Wheat,
  Carrot,
  SprayCan,
  Flame,
  Wine,
  Nut,
} from "lucide-react";
import React from "react";

type categoryType = {
  [key: string]: {
    icon: React.ReactNode;
    fullName: string;
  };
};

const categories: categoryType = {
  all:        { icon: <ShoppingCart size={20} />, fullName: "All Items" },
  dairy:      { icon: <Droplet size={20} />,      fullName: "Dairy" },
  fruits:     { icon: <Apple size={20} />,        fullName: "Fruits & Vegetables" },
  bakery:     { icon: <Cookie size={20} />,       fullName: "Bakery & Cakes" },
  beverages:  { icon: <Coffee size={20} />,       fullName: "Beverages" },
  snacks:     { icon: <Package size={20} />,      fullName: "Snacks & Confectionery" },
  frozen:     { icon: <IceCream size={20} />,     fullName: "Frozen Foods" },
  meat:       { icon: <Drumstick size={20} />,    fullName: "Meat & Poultry" },
  seafood:    { icon: <Fish size={20} />,         fullName: "Seafood" },
  pantry:     { icon: <Leaf size={20} />,         fullName: "Pantry Staples" },
  household:  { icon: <Home size={20} />,         fullName: "Household & Cleaning" },
  personal:   { icon: <LifeBuoy size={20} />,     fullName: "Personal Care" },
  baby:       { icon: <Baby size={20} />,         fullName: "Baby Care" },
  pet:        { icon: <Drumstick size={20} />,    fullName: "Pet Supplies" },
  organic:    { icon: <Leaf size={20} />,         fullName: "Organic & Health Foods" },
  grains:     { icon: <Wheat size={20} />,        fullName: "Grains & Cereals" },
  vegetables: { icon: <Carrot size={20} />,       fullName: "Fresh Vegetables" },
  cleaning:   { icon: <SprayCan size={20} />,     fullName: "Cleaning Supplies" },
  spices:     { icon: <Flame size={20} />,        fullName: "Spices & Condiments" },
  alcohol:    { icon: <Wine size={20} />,         fullName: "Alcoholic Beverages" },
  nuts:       { icon: <Nut size={20} />,          fullName: "Nuts & Dry Fruits" },
};

export default categories;
