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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  {/*useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
*/}

useEffect(() => {
  if (bounds) {
    getPlacesData(bounds.sw, bounds.ne)
     .then((data) => {
        console.log(data);
        setPlaces(data);
      });
  }
}, [coordinates, bounds]);


  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Map
            setCoordinates= {setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;