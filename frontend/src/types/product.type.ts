export interface UserProps {
  id: number;
  name: string;
  email: string;
}

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  buying_price: number;
  selling_price: number;
  image: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  image_url: string;
  user: UserProps;
}
