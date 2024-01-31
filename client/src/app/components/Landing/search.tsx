import styles from "@/app/components/Landing/page.module.css";
import dotenv from "dotenv";
import * as React from 'react';
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { RootState } from "@/lib/store";
import { addAddress } from "@/lib/features/address/addressSlice";
import { useSelector, useDispatch } from "react-redux";

dotenv.config();
const googleKey = process.env.GOOGLEPLACES;

interface AdrPro {
  value: {
    description: string;
    place_id: string;
  }
}

const Search = () => {
  const stateAddress = useSelector((state: RootState) => state.addAddress);
  const dispatch = useDispatch();

  const [address, setAddress] = useState<AdrPro>({ value: stateAddress });

  useEffect(() => {
    setAddress({ value: stateAddress });
  }, [stateAddress]);

  useEffect(() => {
    const newAddress = {
      value: {
        description: address.value.description,
        place_id: address.value.place_id
      }
    };
    dispatch(addAddress(newAddress));
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
