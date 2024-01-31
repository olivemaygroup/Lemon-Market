import styles from "@/app/components/Landing/page.module.css";
import dotenv from "dotenv";
import * as React from 'react';
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { RootState } from "@/lib/store";
import { addAddress } from "@/lib/features/address/addressSlice";
import { useSelector, useDispatch } from "react-redux";

dotenv.config();
const googleKey = process.env.GOOGLEMAPS;

interface AdrPro {
  value: {
    description: string;
    place_id: string;
  }

}

const Search = () => {


  let [description, SetDescription] = useState('')
  let [placeID, SetPlaceID] = useState('')
  const stateAddress = useSelector((state: RootState) => state.addAddress);
  const dispatch = useDispatch();

  const [address, setAddress] = useState<AdrPro>({ value: stateAddress });

  useEffect(() => {
    setAddress({ value: stateAddress });
  }, [stateAddress]);

  React.useEffect(() => {
    description = address.value.description
    placeID = address.value.place_id
    dispatch(addAddress(description))
    dispatch(addAddress(placeID))


  }, [address])





  return (
    <div className={styles.searchContainer}>
      <GooglePlacesAutocomplete
        selectProps={{
          placeholder: 'search for a property',
          onChange: SetAddress

        }}
      />
      <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`} />
    </div>
  );

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
