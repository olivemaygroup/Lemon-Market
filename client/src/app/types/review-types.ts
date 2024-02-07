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
  tenant_id?: number
}

export interface Photo {
  url: string;
  tag: string;
  photo_id: number
}

export interface ImageFileObject {
  file: File;
  tag: string
};