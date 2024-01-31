'use client'

import styles from "@/app/components/Landing/page.module.css";
import dotenv from "dotenv";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from "react";
import axios from 'axios'

dotenv.config()


const Search = () => {


  const [searchAddress, SetSearchAddress] = useState('')

 
  const apiKey = 'ZD23lmGQEJojUp48N8h7l8cbwq6xwSEM';

  // async function find() {
  //   axios.get('https://api.os.uk/search/places/v1/find?maxresults=1&query=Ordnance%20Survey,%20Adanac%20Drive,%20SO16&key=' + apiKey)
  //   .then(function(response) {
  //       const response = JSON.stringify(response.data, null, 2);
  //       console.log(response);
  //   });
  // }
  // find()



  return (
      <div className={styles.searchContainer}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '90%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }} id="outlined-basic" label="search address" variant="outlined"
            
          />

        </Box>
      </div>

  );
};


export default Search;
