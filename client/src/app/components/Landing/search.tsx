'use client'
import styles from "@/app/components/Landing/page.module.css";
import dotenv from "dotenv";
import * as React from 'react';
import { useState } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { addAddress } from "@/lib/features/address/addressSlice";
import StoreProvider from "@/app/StoreProvider";
import { Provider, useDispatch } from "react-redux";


dotenv.config()
const googleKey = process.env.GOOGLEMAPS

interface AdrPro {
  value:  {
    description: string;
    place_id: string;
  } 

}

const Search = () => {
  
  const dispatch = useDispatch()
  const [address, SetAddress] = useState<AdrPro>({ value: { description: "", place_id: "" } });
  
  console.log(address)
  let [description, SetDescription] = useState('')
  let [placeID, SetPlaceID] = useState('')

  React.useEffect(() => {
    description = address.value.description
    placeID = address.value.place_id
    dispatch(addAddress(description))
    dispatch(addAddress(placeID))


  },[address])

 
  


  
    return (
      
      <div className={styles.searchContainer}>
     
        <GooglePlacesAutocomplete
          selectProps={{
            placeholder: 'search for a property',
            onChange: SetAddress
            
          }}
          />
          <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`}/>
    
      </div>

);
};


export default Search;

