import styles from "@/app/components/Landing/page.module.css";
import dotenv from "dotenv";
import * as React from 'react';
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { RootState } from "@/lib/store";
import { addAddress } from "@/lib/features/address/addressSlice";
import { useSelector, useDispatch } from "react-redux";
import { PropertyType } from "@/app/types/property-type";
import checkAddress from "@/app/ApiServices/propertyAPI";
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";
import { addProperty } from "@/lib/features/property/propertySlice";

dotenv.config();



interface AdrPro {
  value: {
    description: string;
    place_id: string;
  }
}

interface PropertyTypeRedux {
  value: PropertyType;
}

const Search = () => {

  const dispatch = useDispatch();

  const property = useSelector((state: RootState) => state.property.value)

  const [address, setAddress] = useState<PropertyType>(property);

  useEffect(() => {
    const newAddress: PropertyType = {
      fullAddress: address.fullAddress,
      property_id: address.property_id
    };
    dispatch(addProperty(newAddress));
  }, [address]);

  return (
    <>
      <div className={styles.searchContainer}>
        <h2 className={styles.catchphrase}>Turning Walls into Windows</h2>
        <p className={styles.quick_description}>Find or leave reviews for a rental</p>
        <GooglePlacesAutocomplete
          selectProps={{
            placeholder: 'Address or postcode ',
            onChange: (address) => {
              setAddress({ fullAddress: address?.value.description, property_id: address?.value.place_id })
            }
          }
          }
        />
      </div>
    </>
  );
};

export default Search;
