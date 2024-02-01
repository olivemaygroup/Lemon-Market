import { PropertyType, PropertyTypeFull } from "../types/property-type";
import handleAuthenticationError from "../utils/auth-router";

const BASE_URL = 'http://localhost:3001'

const checkAddress = async (
  property: PropertyType,
): Promise<PropertyTypeFull | undefined> => {
  try {

    const response = await fetch(`${BASE_URL}/checkaddress`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });

    if (response.status === 401) {
      handleAuthenticationError();
    } else if (response.status === 201) {
      return
    }

    if (!response.ok) {
      return undefined
    } else if (response.status === 200) {
      const propertyWithReviews: PropertyTypeFull = await response.json();
      return propertyWithReviews;
    } else if (response.status == 201) {
      const propertyWithoutReview: PropertyTypeFull = await response.json();
      return propertyWithoutReview;
    } else {
      const newProperty: PropertyTypeFull = await response.json();
      return newProperty
    }
  } catch (err) {
    return undefined
  }
};

export default checkAddress;
