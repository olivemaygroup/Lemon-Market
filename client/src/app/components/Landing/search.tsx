import styles from "@/app/components/Landing/page.module.css";
import dotenv from "dotenv";
import * as React from 'react';
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { RootState } from "@/lib/store";
import { addAddress } from "@/lib/features/address/addressSlice";
import { useSelector, useDispatch } from "react-redux";
import { addProperty } from "@/lib/features/property/propertySlice";
import { PropertyType } from "@/app/types/property-type";

dotenv.config();
const googleKey = process.env.GOOGLEPLACES;

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

  const reviewList = useSelector((state: RootState) => state.reviewList.value)

  const property = useSelector((state: RootState) => state.property.value)

  const [address, setAddress] = useState<PropertyType>(property);

  useEffect(() => {
    setAddress(property);
  }, [property]);

  useEffect(() => {
    const newAddress: PropertyType = {
      fullAddress: address.fullAddress,
      property_id: address.property_id
    };
    dispatch(addProperty(newAddress));
  }, [address, dispatch]);

  return (
    <div className={styles.searchContainer}>
      <GooglePlacesAutocomplete
        selectProps={{
          placeholder: 'search for a property',
          address,
          onChange: (address) => setAddress(address)
        }}
      />
      <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`} />
    </div>
  );
};

export default Search;
