import { Review } from "../types/review-types";
import handleAuthenticationError from "../utils/auth-router";

const BASE_URL = process.env.SERVER_URL;

const addReview = async (
  property_id: string,
  reviewData: Review,
  accessToken: string,
): Promise<void | undefined> => {
  try {
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
};

const getMyReviews = async (accessToken: string): Promise<Review[] | undefined> => {
  try {
    const response = await fetch("/api/myreviews", {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const allReviews: Review[] = await response.json();

    //return all the reviews

    return allReviews;
  } catch (err) {
    return undefined

  }
};

const editReview = async (
  review_id: number,
  updatedReviewData: Review,
  accessToken: string,
): Promise<Review | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/editreview/${review_id}`, {
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
};

const deleteReview = async (
  review_id: number,
  accessToken: string,
): Promise<void | undefined> => {
  try {
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
};

const reviewAPI = { addReview, deleteReview, getMyReviews, editReview };

export default reviewAPI;
