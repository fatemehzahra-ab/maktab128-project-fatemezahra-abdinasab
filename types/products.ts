export type Category = {
  icon?: string;
  _id: string;
  name: string;
};
export type Subcategory = {
  _id: string;
  name: string;
  category: string;
};
export type Product = {
  _id?: string;
  category: string;
  subcategory: string;
  name: string;
  slugname?: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail?: string;
  images?: string[];
  rating?: { rate: number; count: number };
  status?: string;
  file?: File;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
  mode: "create" | "edit";
};
