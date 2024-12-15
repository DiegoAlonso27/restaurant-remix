import { DocumentTypeEnum } from "~/utils/enums/DocumentTypeEnum";
import { RoleEnum } from "~/utils/enums/RoleEnum";

export interface User {
  id: number;
  username: string;
  document_type: Exclude<DocumentTypeEnum, DocumentTypeEnum.RUC>;
  document_number: string;
  name: string;
  email: string;
  is_enabled: boolean;
  phone: string;
  role: RoleEnum;
  created_at: string;
  updated_at: string;
}

export interface Table {
  id: number;
  number: string;
  is_available: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  min_stock: number;
  stock: number;
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
}

export interface Kardex {
  id: number;
  product: {
    id: number;
    name: string;
  };
  quantity: number;
  user: {
    id: number;
    name: string;
  };
  movement_type: "INPUT" | "OUTPUT";
  reason: string;
}
