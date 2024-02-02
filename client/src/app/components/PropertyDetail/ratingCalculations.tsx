import { Review } from "@/app/types/review-types";

export const cleanlinessRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.cleanliness !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.cleanliness, 0);
  const cleanlinessAverage: number = Math.round(total / length);
  return cleanlinessAverage;
};

export const maintenanceRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.maintenance !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.cleanliness, 0);
  const maintenanceAverage: number = Math.round(total / length);
  return maintenanceAverage;
};

export const valueRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.value_for_money !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.cleanliness, 0);
  const valueAverage: number = Math.round(total / length);
  return valueAverage;
};

export const depositRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.deposit_handling !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.cleanliness, 0);
  const depositAverage: number = Math.round(total / length);
  return depositAverage;
};

export const amenitiesRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.amenities !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.cleanliness, 0);
  const amenitiesAverage: number = Math.round(total / length);
  return amenitiesAverage;
};

export const landlordRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.landlord_responsiveness !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.cleanliness, 0);
  const landlordAverage: number = Math.round(total / length);
  return landlordAverage;
};

export const rentRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.monthly_rent !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.cleanliness, 0);
  const rentAverage: number = Math.round(total / length);
  return rentAverage;
};

export const councilRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.council_tax !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.cleanliness, 0);
  const councilAverage: number = Math.round(total / length);
  return councilAverage;
};