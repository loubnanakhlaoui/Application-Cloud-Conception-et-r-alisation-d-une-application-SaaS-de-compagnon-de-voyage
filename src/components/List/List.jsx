import React, { useState, useEffect,createRef } from 'react';
import { Grid, Typography, InputLabel, MenuItem, FormControl, Select,CircularProgress } from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places,type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  
  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div>
      <Typography variant="h4">Restaurants , Hotels  &  Attractions  around  you</Typography>
      {isLoading ? (
        <div>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl sx={{ height: '10px' , width:'200px' }}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ height: '10px', width:'200px' }}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3}>
            {places?.map((place, i) => (
              <Grid item xs={12} key={i}>
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
export default List;