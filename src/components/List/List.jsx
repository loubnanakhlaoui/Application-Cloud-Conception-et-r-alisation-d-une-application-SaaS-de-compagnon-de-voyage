import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (places && places.length > 0) {
      setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }
  }, [places]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" style={{ margin: '1rem 0' }}>Restaurants,Hotels & Attractions around you</Typography>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl style={{ marginBottom: '1rem' }}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ marginBottom: '1rem' }}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} style={{ flex: 1 }}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;