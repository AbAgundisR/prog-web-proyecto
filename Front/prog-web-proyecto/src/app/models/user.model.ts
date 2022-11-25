export interface User {
  id: number;
  is_superuser: boolean;
  username: string;
  email: string;
  password?: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  address_city: string;
  address_state: string;
  address_country: string;
  address_cp: number;
  created_at: Date;
  updated_at: Date;
}
