export interface PropertyType {
  number: string;
  apartment: string;
  street: string;
  postcode: string;
  city: string;
  num_of_reviews?: number;
  avg_rating?: number;
}

export interface Contact {
  firstName: string,
  lastName: string,
  email: string,
  password: string
};

export interface Login {
  email: string,
  password: string
}

export interface PropertyType {
  number: string;
  apartment: string;
  street: string;
  postcode: string;
  city: string;
  num_of_reviews?: number;
  avg_rating?: number;
}

export interface Review {
  t_start: string;
  t_end: string;
  cleanliness: number;
  cleanliness_comment: string | null;
  maintenance: number;
  maintenance_comment: string | null;
  value_for_money: number;
  value_for_money_comment: string | null;
  deposit_handling: number;
  deposit_handling_comment: string | null;
  amenities: number;
  amenities_comment: string | null;
  landlord_responsiveness: number;
  landlord_responsiveness_comment: string | null;
  total_review_rating: number;
  monthly_rent: number;
  monthly_bill: number;
  council_tax: number;
  general_comment: string;
  photos: Photo[];
}

export interface Tenant {
  tenant_id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface Photo {
  url: string;
  tag: string;
}