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
  const total: number = filteredReviews.reduce((total, review) => total + review.maintenance, 0);
  const maintenanceAverage: number = Math.round(total / length);
  return maintenanceAverage;
};

export const valueRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.value_for_money !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.value_for_money, 0);
  const valueAverage: number = Math.round(total / length);
  return valueAverage;
};

export const depositRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.deposit_handling !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.deposit_handling, 0);
  const depositAverage: number = Math.round(total / length);
  return depositAverage;
};

export const amenitiesRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.amenities !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.amenities, 0);
  const amenitiesAverage: number = Math.round(total / length);
  return amenitiesAverage;
};

export const landlordRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.landlord_responsiveness !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.landlord_responsiveness, 0);
  const landlordAverage: number = Math.round(total / length);
  return landlordAverage;
};

export const rentRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.monthly_rent !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.monthly_rent, 0);
  const rentAverage: number = (total > 0 ? Math.round(total / length) : 0);
  return rentAverage;
};

export const councilRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.council_tax !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.council_tax, 0);
  const councilAverage: number = (total > 0 ? Math.round(total / length) : 0);
  return councilAverage;
};

export const generalRating = (reviews: Review[]): number => {
  const filteredReviews = reviews.filter(review => review.total_review_rating !== 0);
  const length: number = filteredReviews.length;
  const total: number = filteredReviews.reduce((total, review) => total + review.total_review_rating, 0);
  const totalAverage: number = Math.round(total / length);
  console.log('calculation total: ', totalAverage)
  return totalAverage;
};