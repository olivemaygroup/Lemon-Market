'use client'
import styles from "@/app/components/Landing/page.module.css";
import dotenv from "dotenv";
import * as React from 'react';
import { useState } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


dotenv.config()


const Search = () => {
  
  const googleKey = process.env.GOOGLEMAPS

  const [address, SetAddress] = useState(null)
  const [componentAddress, SetComponentAddress] = useState(null)
  const [componentRating, SetComponentRating] = useState(null)
  const [photos, SetPhotos] = useState(null)

  const handleChange = async (e) => {
    e.preventDefault()

    const newAddress = address;

      try {
        const response = await fetch('http://localhost:3000/...', {
          method: 'GET',
          mode: 'cors',
          body: JSON.stringify(newAddress),
          
        })

        const json = await response.json()

        if (!response.ok) {
          // Render the generic component from 
        }
        if (response.ok) {
          
        }


      } catch {

      }
  }

  
    return (
      <div className={styles.searchContainer}>
     
        <GooglePlacesAutocomplete
          apiKey="AIzaSyC5sowPUHSSPyo022u07VJcHzMnoLifn1Q"
          selectProps={{
            placeholder: 'search for a property',
            onChange: handleChange((e) => e.target.value),
            
          }}
        />
    
      </div>

);
};


export default Search;

