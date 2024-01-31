import { PropertyType, PropertyTypeFull } from "../types/types";
import handleAuthenticationError from "../utils/auth-router";

const BASE_URL = process.env.SERVER_URL;

const checkAddress = async (
  accesToken: string,
  propertyData: PropertyType,
): Promise<PropertyType | PropertyTypeFull> => {
  try {
    const { number, apartment, street, postcode, city } = propertyData;

    if (!number || !street || !postcode || !city || !apartment) {
      throw new Error("Undefined number, street, postcode, city, or apartment");
    }

    const response = await fetch(`${BASE_URL}/checkaddress`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorisation: accesToken,
      },
      body: JSON.stringify(propertyData),
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    } else if (response.status === 200) {
      const propertyWithReviews: PropertyTypeFull = await response.json();
      return propertyWithReviews;
    } else {
      const propertyWithoutReviews: PropertyType = await response.json();
      return propertyWithoutReviews;
    }
  } catch (err) {
    throw new Error("Error when looking for or creating address");
  }
};

export default checkAddress;
