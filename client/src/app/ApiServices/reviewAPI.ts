import { PropertyTypeFull } from "../types/property-type";
import { Review } from "../types/review-types";
import handleAuthenticationError from "../utils/auth-router";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

const addReview = async (
  property_id: string,
  reviewData: Review,
): Promise<void | undefined> => {
  if (typeof window !== 'undefined') {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      handleAuthenticationError();
      return
    }
    
    const response = await fetch(`${BASE_URL}/addreview/${property_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(reviewData),
    });
    
    
    if (response.status === 401) {
      handleAuthenticationError();
    }
    
    if (!response.ok) {
      return undefined
    }
    
    //return nothing
  } catch (err) {
    console.error(err);
    return undefined
  }
}
};

const getMyReviews = async (): Promise<PropertyTypeFull[] | undefined> => {
  if (typeof window !== 'undefined') {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      handleAuthenticationError();
      return
    }

    const response = await fetch(`${BASE_URL}/myreviews`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      return undefined
    }
    
    const allReviews: PropertyTypeFull[] = await response.json();
    
    //return all the reviews
    return allReviews;
  } catch (err) {
    return undefined
    
  }
}
}

const editReview = async (
  review_id: number,
  property_id: number,
  updatedReviewData: Review,
): Promise<Review | undefined> => {
  if (typeof window !== 'undefined') {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      handleAuthenticationError();
      return
    }

    const response = await fetch(`${BASE_URL}/editreview/${property_id}/${review_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(updatedReviewData),
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      return undefined
    }

    const editedReview: Review = await response.json();
    //return the full edited review
    return editedReview;

  } catch (err) {
    console.error(err);
    return undefined
    
  }
}
}

const deleteReview = async (
  review_id: number,
): Promise<void | undefined> => {
  if (typeof window !== 'undefined') {
  try {
    
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      handleAuthenticationError();
      return
    }

    const response = await fetch(`/api/deletereview/${review_id}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken, // Include the access token for authorization
      },
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      return undefined
    }

    //return nothing
  } catch (err) {
    console.error(err);
    return undefined
  }
};}

const reviewAPI = { addReview, deleteReview, getMyReviews, editReview };

export default reviewAPI;
