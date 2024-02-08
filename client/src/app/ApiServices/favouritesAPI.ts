import { PropertyType } from "../types/property-type";
import handleAuthenticationError from "../utils/auth-router";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

// Get search results
const getSearchResults = async (
): Promise<PropertyType[] | undefined> => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      handleAuthenticationError();
      return
    }

    const response = await fetch(`${BASE_URL}/getsearchresults`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
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
  property_id: number,
): Promise<PropertyType | undefined> => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      handleAuthenticationError();
      return
    }

    const response = await fetch(
      `${BASE_URL}/addsearchresults/${property_id}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorisation: accessToken,
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
const getFavourites = async (): Promise<PropertyType[] | undefined> => {
  if (typeof window !== 'undefined') {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      handleAuthenticationError();
      return
    }


    const response = await fetch(`${BASE_URL}/getfavourites`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
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
  }}
};

// Add user favorite
const addFavorite = async (
  property_id: string,
): Promise<void | undefined> => {
  if (typeof window !== 'undefined') {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      handleAuthenticationError();
      return
    }

    const response = await fetch(`${BASE_URL}/addfavourites/${property_id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    console.log('response from call', response)
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
}
};

// Remove user favorite
const removeFavorite = async (
  property_id: string,
  ): Promise<void | undefined> => {
    if (typeof window !== 'undefined') {
    try {

      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        handleAuthenticationError();
        return
      }

      const response = await fetch(
        `${BASE_URL}/deletefavourite/${property_id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        },
        );
        console.log('delete response from call', response)

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
    }
};

const favouriteAPIservice = {
  getSearchResults,
  addSearchResult,
  getFavourites,
  addFavorite,
  removeFavorite,
};

export default favouriteAPIservice;
