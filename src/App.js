import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import {getPlacesData} from './api';
import Header from './components/Header/Header';
import List  from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates,setCoordinates]=useState({});
  const [bounds,setBounds]=useState(null);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  
useEffect(() => {
  const filtered = places.filter((place) => Number(place.rating) > rating);

  setFilteredPlaces(filtered);
}, [rating]);


useEffect(() => {
  if (bounds) {
    getPlacesData(type , bounds.sw , bounds.ne)
     .then((data) => {
        console.log(data);
        setPlaces(data);
        setIsLoading(false);
        setFilteredPlaces([]);
        setRating('');
      });
  }
}, [type,coordinates, bounds]);


  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
             places={filteredPlaces.length ? filteredPlaces : places}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating} 
            childClicked={childClicked}
            />
        </Grid>
        <Grid item xs={12} md={4}>
          <Map
            setCoordinates= {setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            childClicked={childClicked}
            
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;