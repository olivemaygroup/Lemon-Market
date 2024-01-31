import { Review } from "./review-types";

export interface PropertyType {
  property_id: string;
  fullAddress: string;
  num_of_reviews?: number;
  avg_rating?: number;
  updatedAt?: Date;
  createdAt?: Date;
}


export interface PropertyTypeFull extends PropertyType {
  reviews: Review[]
}