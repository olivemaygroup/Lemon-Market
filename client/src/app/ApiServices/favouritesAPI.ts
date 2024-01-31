import { PropertyType } from "../types/property-type";
import handleAuthenticationError from "../utils/auth-router";

const BASE_URL = process.env.SERVER_URL;

// Get search results
const getSearchResults = async (
  accesToken: string,
): Promise<PropertyType[] | undefined> => {
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
      return undefined
    }

    const data: PropertyType[] = await response.json();
    return data; // Array of search results
  } catch (error) {
    console.error(error);
    return undefined
  }
};

// Add search results
const addSearchResult = async (
  accesToken: string,
  property_id: number,
): Promise<PropertyType | undefined> => {
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
      return undefined
    }

    const data: PropertyType = await response.json();
    return data; //search results that has been added
  } catch (error) {
    console.error(error);
    return undefined
  }
};

// Get user favorites
const getFavorites = async (accesToken: string): Promise<PropertyType[] | undefined> => {
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
      return undefined
    }

    const data: PropertyType[] = await response.json();
    return data; // Array of favorite properties
  } catch (error) {
    console.error(error);
    return undefined
  }
};

// Add user favorite
const addFavorite = async (
  accesToken: string,
  property_id: number,
): Promise<void | undefined> => {
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
       return undefined
    }

    //doesn't return anything
  } catch (error) {
    console.error(error);
    return undefined
  }
};

// Remove user favorite
const removeFavorite = async (
  accesToken: string,
  property_id: number,
  favourite_id: number,
): Promise<void | undefined> => {
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
      return undefined
    }
    //doesn't return anything
  } catch (error) {
    console.error(error);
    return undefined
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
