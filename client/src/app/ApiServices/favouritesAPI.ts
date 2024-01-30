import { PropertyType } from "../types/types";
import handleAuthenticationError from "../utils/auth-router";

const BASE_URL = process.env.SERVER_URL;

// Get search results
const getSearchResults = async (
  accesToken: string,
): Promise<PropertyType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/getsearchresults`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorisation: accesToken,
      },
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data: PropertyType[] = await response.json();
    return data; // Array of search results
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Add search results
const addSearchResult = async (
  accesToken: string,
  property_id: number,
): Promise<PropertyType> => {
  try {
    const response = await fetch(
      `${BASE_URL}/addsearchresults/${property_id}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorisation: accesToken,
        },
      },
    );
    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      throw new Error("Failed to add search results");
    }

    const data: PropertyType = await response.json();
    return data; //search results that has been added
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get user favorites
const getFavorites = async (accesToken: string): Promise<PropertyType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/getfavourites`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorisation: accesToken,
      },
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch favorite properties");
    }

    const data: PropertyType[] = await response.json();
    return data; // Array of favorite properties
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Add user favorite
const addFavorite = async (
  accesToken: string,
  property_id: number,
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/addfavourites/${property_id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorisation: accesToken,
      },
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      throw new Error("Failed to add property to favorites");
    }

    //doesn't return anything
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Remove user favorite
const removeFavorite = async (
  accesToken: string,
  property_id: number,
  favourite_id: number,
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/deletefavourite/${property_id}/${favourite_id}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorisation: accesToken,
        },
      },
    );

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      throw new Error("Failed to remove property from favorites");
    }
    //doesn't return anything
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const favouriteAPIservice = {
  getSearchResults,
  addSearchResult,
  getFavorites,
  addFavorite,
  removeFavorite,
};

export default favouriteAPIservice;
