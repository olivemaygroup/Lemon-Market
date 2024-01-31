import { PropertyType, PropertyTypeFull } from "../types/property-type";
import handleAuthenticationError from "../utils/auth-router";

const BASE_URL = process.env.SERVER_URL;

const checkAddress = async (
  accessToken: string,
  property: PropertyType,
): Promise<PropertyType | PropertyTypeFull | undefined> => {
  try {

    const response = await fetch(`${BASE_URL}/checkaddress`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorisation: accessToken,
      },
      body: JSON.stringify(property),
    });

    if (response.status === 401) {
      handleAuthenticationError();
    }

    if (!response.ok) {
      return undefined
    } else if (response.status === 200) {
      const propertyWithReviews: PropertyTypeFull = await response.json();
      return propertyWithReviews;
    } else {
      const propertyWithoutReviews: PropertyType = await response.json();
      return propertyWithoutReviews;
    }
  } catch (err) {
    return undefined
  }
};

export default checkAddress;
